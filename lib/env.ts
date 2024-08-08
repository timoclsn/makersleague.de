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
  EASYVEREIN_TOKEN: envVarSchema,

  // Instagram
  INSTAGRAM_USER_ID: envVarSchema,
  INSTAGRAM_ACCESS_TOKEN: envVarSchema,

  // CRON
  CRON_SECRET: envVarSchema,

  // Resend
  RESEND_API_KEY: envVarSchema,

  // Admin
  HTTP_BASIC_AUTH: envVarSchema,

  // Client

  // Vercel
  NEXT_PUBLIC_VERCEL_ENV: z
    .enum(["production", "preview", "development"])
    .optional(),
  NEXT_PUBLIC_VERCEL_URL: envVarSchema.optional(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.input<typeof envSchema> {}
  }
}
