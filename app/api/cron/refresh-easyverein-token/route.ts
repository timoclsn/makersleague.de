import { isAuthorizedCronRequest } from "@/lib/cron";
import {
  EDGE_CONFIG_TOKEN_KEY,
  fetchEasyverein,
  getEasyvereinToken,
} from "@/lib/easyverein";
import { sendLoggingEmail } from "@/lib/email";
import { wait } from "@/lib/utils";
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

const withRetries = async (fn: () => Promise<void>, attempts = 3) => {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= attempts) throw error;
      await wait(attempt * 2000);
    }
  }
};

const writeStoredToken = async (token: string) => {
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
        { operation: "upsert", key: EDGE_CONFIG_TOKEN_KEY, value: token },
      ],
    }),
  });

  if (!patchRes.ok) {
    const errorBody = await patchRes.text();
    throw new Error(
      `Edge Config update failed: ${patchRes.status} ${patchRes.statusText} — ${errorBody}`,
    );
  }
};

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

    // ?force=1 rotates even when easyVerein doesn't ask for it, to test the whole flow
    const force = request.nextUrl.searchParams.get("force") === "1";

    if (!refreshNeeded && !force) {
      return Response.json({ success: true, refreshed: false });
    }

    // refresh-token invalidates the current token, so make sure the store
    // accepts writes before rotating. Writing the current value is a no-op.
    try {
      await writeStoredToken(await getEasyvereinToken());
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Skipped the refresh because the store is not writable, so the current token stays valid. Check VERCEL_API_TOKEN, EDGE_CONFIG_ID and VERCEL_TEAM_ID.\n\n${message}`,
      );
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

    // The old token may already be invalid, so retry before giving up on the new one
    try {
      await withRetries(() => writeStoredToken(newToken));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(
        `${message}\n\nThe token was rotated but the new one could not be saved, so the stored token no longer works. Create a new v2.0 token in easyVerein and save it as ${EDGE_CONFIG_TOKEN_KEY} in the store.`,
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
