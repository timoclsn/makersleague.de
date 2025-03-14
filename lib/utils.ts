import { cx } from "cva";
import { format as formatDfns } from "date-fns";
import { de } from "date-fns/locale";

const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
const PORT = process.env.PORT;

export const isProductionDeployment = NEXT_PUBLIC_VERCEL_ENV === "production";

export const getBaseUrl = () => {
  if (isProductionDeployment) return "https://makersleague.de";
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

export const cn = cx;

/**
 * Checks if a given date is today's birthday (comparing only month and day)
 * @param birthDate - The birth date to check
 * @param today - Optional reference date (defaults to current date)
 * @returns boolean indicating if it's the birthday
 */
export const isBirthday = (birthDate: Date, today: Date = new Date()): boolean => {
  return (
    today.getDate() === birthDate.getDate() &&
    today.getMonth() === birthDate.getMonth()
  );
};
