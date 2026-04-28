import {
  API_URL,
  EDGE_CONFIG_TOKEN_KEY,
  getEasyvereinToken,
} from "@/lib/easyverein";
import { sendLoggingEmail } from "@/lib/email";
import { NextRequest } from "next/server";
import { z } from "zod";

const {
  CRON_SECRET,
  NODE_ENV,
  VERCEL_API_TOKEN,
  EDGE_CONFIG_ID,
  VERCEL_TEAM_ID,
} = process.env;

const refreshTokenResponseSchema = z
  .object({
    token: z.string().optional(),
    Bearer: z.string().optional(),
    bearer: z.string().optional(),
    expiresIn: z.union([z.number(), z.string()]).optional(),
  })
  .passthrough();

export async function GET(request: NextRequest) {
  if (NODE_ENV === "production") {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  try {
    const currentToken = await getEasyvereinToken();

    const refreshRes = await fetch(`${API_URL}/refresh-token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken}`,
        Accept: "application/json",
      },
    });

    if (!refreshRes.ok) {
      throw new Error(
        `Refresh-token request failed: ${refreshRes.status} ${refreshRes.statusText}`,
      );
    }

    const body = refreshTokenResponseSchema.parse(await refreshRes.json());
    const newToken = body.token ?? body.Bearer ?? body.bearer;

    if (!newToken) {
      throw new Error(
        `No token in refresh-token response. Body keys: ${Object.keys(body).join(", ")}`,
      );
    }

    if (!VERCEL_API_TOKEN || !EDGE_CONFIG_ID) {
      throw new Error(
        "Missing VERCEL_API_TOKEN or EDGE_CONFIG_ID environment variables",
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

    if (NODE_ENV === "production") {
      await sendLoggingEmail({
        subject: "ML Easyverein Token Refreshed",
        text: `Easyverein token refreshed successfully. expiresIn: ${body.expiresIn ?? "unknown"}`,
      });
    }

    return Response.json({ success: true, expiresIn: body.expiresIn ?? null });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Failed to refresh easyverein token:", error);

    if (NODE_ENV === "production") {
      await sendLoggingEmail({
        subject: "ML Easyverein Token Refresh FAILED",
        text: `Easyverein token refresh failed:\n\n${message}`,
      });
    }

    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
