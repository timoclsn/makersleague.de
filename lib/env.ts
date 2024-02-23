import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.string().min(1),
  EASYVEREIN_TOKEN: z.string().min(1),
  INSTAGRAM_USER_ID: z.string().min(1),
  INSTAGRAM_ACCESS_TOKEN: z.string().min(1),
  NEXT_PUBLIC_VERCEL_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_VERCEL_ENV: z.enum(["preview", "production"]).optional(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
