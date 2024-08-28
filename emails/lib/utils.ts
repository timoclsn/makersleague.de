const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
const PORT = process.env.PORT;

export const isProductionDeployment = NEXT_PUBLIC_VERCEL_ENV === "production";

export const getBaseUrl = () => {
  if (isProductionDeployment) return "https://makersleague.de";
  if (NEXT_PUBLIC_VERCEL_URL) return `https://${NEXT_PUBLIC_VERCEL_URL}`;
  return `http://localhost:${PORT ?? 3000}`;
};
