import { NextRequest } from "next/server";

const { CRON_SECRET, NODE_ENV } = process.env;

// Vercel sends CRON_SECRET as a bearer token; only enforced in production
export const isAuthorizedCronRequest = (request: NextRequest) =>
  NODE_ENV !== "production" ||
  request.headers.get("authorization") === `Bearer ${CRON_SECRET}`;
