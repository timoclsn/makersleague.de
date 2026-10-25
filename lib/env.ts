import { z } from "zod";

const envVarSchema = z.string().min(1);

const envSchema = z.object({
  // Server

  // Node.js
  PORT: envVarSchema.optional(),

  // Vercel
  VERCEL: z.enum(["1"]).optional(),
  VERCEL_URL: envVarSchema.optional(),

  // EasyVerein
  // Fallback when the token is not in Edge Config (e.g. local dev)
  EASYVEREIN_TOKEN: envVarSchema.optional(),
  GLOBAL_CONFIG: envVarSchema.optional(),
  EDGE_CONFIG_ID: envVarSchema.optional(),
  VERCEL_API_TOKEN: envVarSchema.optional(),
  VERCEL_TEAM_ID: envVarSchema.optional(),

  // CRON
  CRON_SECRET: envVarSchema,

  // Resend
  RESEND_API_KEY: envVarSchema,

  // Admin
  HTTP_BASIC_AUTH: envVarSchema,

  // WhatsApp
  WHATSAPP_COMMUNITY_LINK: envVarSchema,

  // Client

  // Vercel
  NEXT_PUBLIC_VERCEL_ENV: z
    .enum(["production", "preview", "development"])
    .optional(),
  NEXT_PUBLIC_VERCEL_URL: envVarSchema.optional(),
});

const env = envSchema.parse(process.env);

if (!env.GLOBAL_CONFIG && !env.EASYVEREIN_TOKEN) {
  throw new Error(
    "Set GLOBAL_CONFIG or EASYVEREIN_TOKEN for the easyVerein API",
  );
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.input<typeof envSchema> {}
  }
}
