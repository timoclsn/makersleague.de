import { format as formatDfns } from "date-fns";
import { de } from "date-fns/locale";

const { NEXT_PUBLIC_VERCEL_ENV, NEXT_PUBLIC_VERCEL_URL, PORT } = process.env;

export const getBaseUrl = () => {
  if (NEXT_PUBLIC_VERCEL_ENV === "production") return `https://makersleague.de`;
  if (NEXT_PUBLIC_VERCEL_URL) return `https://${NEXT_PUBLIC_VERCEL_URL}`;
  return `http://localhost:${PORT ?? 3000}`;
};

export const formatDate = (date: number | Date, format: string) =>
  formatDfns(date, format, { locale: de });

/**
 * Wait for a specified amount of time.
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the specified time has elapsed.
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
