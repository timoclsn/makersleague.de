# easyVerein API token

The site loads members and events from the [easyVerein API](https://hexa.easyverein.com/api/v2.0) at build and render time. Without a valid token, `pnpm build` and every page that shows members or events fail with `401 Unauthorized`.

## How it works

- API v2.0 only accepts expiring tokens (valid for 30 days). Every response carries a `tokenRefreshNeeded` header that says when the token should be renewed.
- The current token lives in Vercel Global Config (formerly Edge Config) under the key `makersleagueEasyvereinToken`, in the `feature-flags` store (`ecfg_gkl0jqefeddsvswkbbt85ldaqkpk`). The plan allows only one store, so it is shared with another project, hence the prefixed key.
- `getEasyvereinToken()` in `lib/easyverein.ts` reads the token from the store via the `GLOBAL_CONFIG` connection string (or legacy `EDGE_CONFIG`). If no store is configured or the key is missing, it falls back to `EASYVEREIN_TOKEN`.
- The daily cron `/api/cron/refresh-easyverein-token` (03:00 UTC, production only) checks `tokenRefreshNeeded`. Only when it is `true` does it call easyVerein's `refresh-token` endpoint and write the new token to the store. It sends a logging email on every renewal and on every failure.

Calling `refresh-token` rotates the token. Don't call it by hand or from tests unless you mean to.

## Environment variables

| Variable           | Where                                                        | Purpose                                                          |
| ------------------ | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| `GLOBAL_CONFIG`    | All environments (set by Vercel when the store is connected) | Read-only connection string for the store                        |
| `EDGE_CONFIG_ID`   | Production                                                   | Store ID, used by the cron to write the new token                |
| `VERCEL_API_TOKEN` | Production                                                   | Team-scoped Vercel token, used by the cron to write to the store |
| `VERCEL_TEAM_ID`   | Production                                                   | Team the store belongs to                                        |
| `EASYVEREIN_TOKEN` | Optional                                                     | Fallback token. Goes stale after the first rotation              |

## Running locally

1. Link the project and pull the development env vars:

   ```sh
   pnpm dlx vercel link
   pnpm dlx vercel env pull .env.local
   ```

   This gives you `GLOBAL_CONFIG`, so the token is always read from the store and stays current.

2. Run `pnpm install` and `pnpm dev`.

Without Vercel access, put a valid v2.0 token in `.env.local` as `EASYVEREIN_TOKEN` instead. You also need placeholder values for the other required variables in `lib/env.ts` (for example `CRON_SECRET=placeholder`, `RESEND_API_KEY=re_placeholder`, `HTTP_BASIC_AUTH=admin:placeholder`, `WHATSAPP_COMMUNITY_LINK=https://example.com`).

## Agents and CI

Agents in cloud environments usually can't run `vercel env pull`. Give them `GLOBAL_CONFIG` (copy the value from the project's Development env vars) as an environment variable rather than `EASYVEREIN_TOKEN`. The connection string is read-only and keeps working when the token rotates, while a copied token goes stale within 30 days. Treat it as a secret anyway: never print it or commit it.

`pnpm lint` and `pnpm typecheck` need no env vars. `pnpm build` and `pnpm dev` need a token, as described above.

## When something breaks

- **Builds or pages fail with 401:** the stored token is expired or invalid. Check the failure emails from the cron, then get a new v2.0 token from easyVerein and save it as `makersleagueEasyvereinToken` in the store.
- **"Easyverein token not configured":** neither `GLOBAL_CONFIG`/`EDGE_CONFIG` nor `EASYVEREIN_TOKEN` is set.
- **Cron fails with "Missing VERCEL_API_TOKEN or EDGE_CONFIG_ID":** the production env vars from the table above are missing.
