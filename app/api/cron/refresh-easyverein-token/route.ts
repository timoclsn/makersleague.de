import { isAuthorizedCronRequest } from "@/lib/cron";
import { EDGE_CONFIG_TOKEN_KEY, fetchEasyverein } from "@/lib/easyverein";
import { sendLoggingEmail } from "@/lib/email";
import { NextRequest } from "next/server";
import { z } from "zod";

const { NODE_ENV, VERCEL_API_TOKEN, EDGE_CONFIG_ID, VERCEL_TEAM_ID } =
  process.env;
const isProduction = NODE_ENV === "production";

// The exact response shape of refresh-token is undocumented, so accept the likely field names
const refreshTokenResponseSchema = z
  .object({
    token: z.string().optional(),
    Bearer: z.string().optional(),
    bearer: z.string().optional(),
    expiresIn: z.union([z.number(), z.string()]).optional(),
  })
  .passthrough();

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    if (!VERCEL_API_TOKEN || !EDGE_CONFIG_ID) {
      throw new Error(
        "Missing VERCEL_API_TOKEN or EDGE_CONFIG_ID environment variables",
      );
    }

    // easyVerein flags on every response whether the token should be renewed
    const checkRes = await fetchEasyverein("member?limit=1&query={id}");

    if (!checkRes.ok) {
      throw new Error(
        `Token check request failed: ${checkRes.status} ${checkRes.statusText}`,
      );
    }

    const refreshNeeded =
      checkRes.headers.get("tokenRefreshNeeded")?.toLowerCase() === "true";

    if (!refreshNeeded) {
      return Response.json({ success: true, refreshed: false });
    }

    const refreshRes = await fetchEasyverein("refresh-token");

    if (!refreshRes.ok) {
      throw new Error(
        `Refresh-token request failed: ${refreshRes.status} ${refreshRes.statusText}`,
      );
    }

    const body = refreshTokenResponseSchema.parse(await refreshRes.json());
    const newToken = body.token ?? body.Bearer ?? body.bearer;
    const expiresIn = body.expiresIn ?? null;

    if (!newToken) {
      throw new Error(
        `No token in refresh-token response. Body keys: ${Object.keys(body).join(", ")}`,
      );
    }

    const edgeConfigUrl = new URL(
      `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items`,
    );
    if (VERCEL_TEAM_ID) {
      edgeConfigUrl.searchParams.set("teamId", VERCEL_TEAM_ID);
    }

    const patchRes = await fetch(edgeConfigUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            operation: "update",
            key: EDGE_CONFIG_TOKEN_KEY,
            value: newToken,
          },
        ],
      }),
    });

    if (!patchRes.ok) {
      const errorBody = await patchRes.text();
      throw new Error(
        `Edge Config update failed: ${patchRes.status} ${patchRes.statusText} — ${errorBody}`,
      );
    }

    if (isProduction) {
      await sendLoggingEmail({
        subject: "ML Easyverein Token Refreshed",
        text: `Easyverein token refreshed successfully. expiresIn: ${expiresIn ?? "unknown"}`,
      });
    }

    return Response.json({ success: true, refreshed: true, expiresIn });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Failed to refresh easyverein token:", error);

    if (isProduction) {
      await sendLoggingEmail({
        subject: "ML Easyverein Token Refresh FAILED",
        text: `Easyverein token refresh failed:\n\n${message}`,
      });
    }

    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
