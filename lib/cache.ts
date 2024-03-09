import { existsSync, mkdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";

const DEFAULT_TTL_IN_S = 60; // 1 minute
const isServerless = process.env.VERCEL === "1";

type CacheKey = "members" | "events";

const CACHE_DIR_NAME = ".cache";
export const CACHE_DIR = isServerless
  ? path.join("/tmp", CACHE_DIR_NAME)
  : path.join(process.cwd(), CACHE_DIR_NAME);
const CACHE_FILE = path.join(CACHE_DIR, "cache.json");

if (!existsSync(CACHE_DIR)) {
  mkdirSync(CACHE_DIR);
}

type InMemoryCache = Record<
  string,
  {
    data: any;
    expiresAt: number;
  }
>;

let inMemoryCache: InMemoryCache | undefined;

export const setCacheValue = (
  key: CacheKey,
  value: any,
  options: { ttl?: number } = {},
) => {
  if (!inMemoryCache) {
    inMemoryCache = {};
  }
  inMemoryCache[key] = {
    data: value,
    expiresAt: new Date().getTime() + (options.ttl ?? DEFAULT_TTL_IN_S) * 1000,
  };
  writeCacheFile();
};

export const getCacheValue = async <TSchema extends z.ZodTypeAny>(
  key: CacheKey,
  schema: TSchema,
) => {
  if (!inMemoryCache) {
    await readCacheFile();
  }

  if (!inMemoryCache) {
    return;
  }

  const cacheEntry = inMemoryCache[key];

  if (!cacheEntry) {
    return;
  }

  if (cacheEntry.expiresAt < new Date().getTime()) {
    console.log(`Cache entry for ${key} expired`);
    delete inMemoryCache[key];
    writeCacheFile();
    return;
  }

  const result = schema.safeParse(cacheEntry.data);

  if (!result.success) {
    console.error(`Error parsing cache value for ${key}`);
    console.error(result.error);
    return;
  }

  return result.data as z.infer<TSchema>;
};

const writeCacheFile = () => {
  try {
    writeFile(CACHE_FILE, JSON.stringify(inMemoryCache, null, 2));
    console.info(`Cache written to ${CACHE_FILE}`);
  } catch (error) {
    console.error("Error writing cache to file");
    console.error(error);
  }
};

const readCacheFile = async () => {
  try {
    const fileCache = await readFile(CACHE_FILE, "utf-8");
    inMemoryCache = JSON.parse(fileCache);
    console.info(`Cache read from ${CACHE_FILE}`);
  } catch (error) {
    console.warn("Error reading cache from file");
    console.warn(error);
  }
};
