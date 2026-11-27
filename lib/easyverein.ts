import { createClient } from "@vercel/global-config";
import { z } from "zod";

const VERSION = "v2.0";
const DOMAIN = "hexa.easyverein.com";
export const API_URL = `https://${DOMAIN}/api/${VERSION}`;

export const EDGE_CONFIG_TOKEN_KEY = "makersleagueEasyvereinToken";

type Endpoint = "member" | "event";

// Vercel Global Config (formerly Edge Config) connection string
const edgeConfig = process.env.GLOBAL_CONFIG
  ? createClient(process.env.GLOBAL_CONFIG)
  : null;

// Every Global Config read counts against the team's monthly quota (50,000 on
// Hobby), so keep the token in memory per function instance instead of
// reading it on every easyVerein request.
const TOKEN_CACHE_TTL_MS = 60 * 60 * 1000;
// A 401 triggers a fresh read, but at most this often, so requests that keep
// failing (e.g. unknown image URLs) can't burn through the quota. Requests
// that fail in between retry with the token from that fresh read.
const TOKEN_REREAD_MIN_INTERVAL_MS = 60 * 1000;

let cachedToken: { value: Promise<string>; readAt: number } | null = null;
let lastRereadAt = 0;

const readEasyvereinToken = async () => {
  if (!edgeConfig) {
    throw new Error("Easyverein token not configured: set GLOBAL_CONFIG");
  }

  try {
    const token = await edgeConfig.get(EDGE_CONFIG_TOKEN_KEY);
    if (typeof token === "string" && token) return token;
  } catch (error) {
    console.error("Failed to read easyVerein token from Edge Config:", error);
  }

  throw new Error(
    `Easyverein token not found in Global Config (${EDGE_CONFIG_TOKEN_KEY})`,
  );
};

export const clearEasyvereinTokenCache = () => {
  cachedToken = null;
};

export const getEasyvereinToken = () => {
  if (!cachedToken || Date.now() - cachedToken.readAt >= TOKEN_CACHE_TTL_MS) {
    // Cache the promise so parallel requests share one read
    const entry = { value: readEasyvereinToken(), readAt: Date.now() };
    cachedToken = entry;
    entry.value.catch(() => {
      if (cachedToken === entry) cachedToken = null;
    });
  }
  return cachedToken.value;
};

// Sends the request with the cached token. On 401 the token was probably
// rotated by the cron since it was cached, so read it again and retry once.
export const fetchWithToken = async (
  url: string | URL,
  init: RequestInit = {},
) => {
  const send = async () => {
    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${await getEasyvereinToken()}`);
    return fetch(url, { ...init, headers });
  };

  const res = await send();
  if (res.status !== 401) return res;

  if (Date.now() - lastRereadAt >= TOKEN_REREAD_MIN_INTERVAL_MS) {
    lastRereadAt = Date.now();
    clearEasyvereinTokenCache();
  }
  return send();
};

const jsonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const fetchEasyverein = async (path: string) =>
  fetchWithToken(`${API_URL}/${path}`, { headers: jsonHeaders });

interface GetOptions {
  id?: string;
  query?: string;
  limit?: number;
  page?: number;
  params?: string;
  start__gte?: string;
}

export const get = async <TSchema extends z.ZodArray<z.ZodTypeAny>>(
  endpoint: Endpoint,
  schema: TSchema,
  options: GetOptions = {},
): Promise<z.output<TSchema>> => {
  const searchParams = new URLSearchParams();
  if (options.query) searchParams.set("query", options.query);
  if (options.limit) searchParams.set("limit", String(options.limit));
  if (options.page) searchParams.set("page", String(options.page));
  if (options.params) searchParams.set("params", options.params);
  if (options.start__gte) searchParams.set("start__gte", options.start__gte);
  const searchParamsString = searchParams.toString();

  const fetchUrl = `${API_URL}/${endpoint}${options.id ? "/" + options.id : ""}${searchParamsString ? "?" + searchParamsString : ""}`;

  const res = await fetchWithToken(fetchUrl, {
    method: "GET",
    headers: jsonHeaders,
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${fetchUrl}. Status ${res.status} ${res.statusText}`,
    );
  }

  const data = await res.json();
  let results = schema.parse(data.results);

  let next = data.next;

  while (next) {
    const res = await fetchWithToken(next, {
      method: "GET",
      headers: jsonHeaders,
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${next}. Status ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();
    const nextResults = schema.parse(data.results);
    results = [...results, ...nextResults] as z.output<TSchema>;
    next = data.next;
  }

  return results;
};

export const customField = (customFields: CustomField[], name: string) =>
  customFields.find((customField) => customField.customField.name === name);

type CustomField = z.infer<typeof customFieldSchema>;
const customFieldSchema = z.object({
  value: z.string(),
  customField: z.object({
    name: z.string(),
  }),
});

export type Member = z.output<typeof memberSchema>;
const memberSchema = z.object({
  id: z.number(),
  joinDate: z.string().nullable(),
  resignationDate: z.string().nullable(),
  _isApplication: z.boolean(),
  _profilePicture: z.string().optional(),
  contactDetails: z.object({
    name: z.string(),
    firstName: z.string(),
    familyName: z.string(),
    dateOfBirth: z.string().nullable(),
  }),
  emailOrUserName: z.string(),
  customFields: z.array(customFieldSchema),
});

export const getMembers = async () => {
  return await get("member", z.array(memberSchema), {
    query:
      "{id,joinDate,resignationDate,_isApplication,_profilePicture,contactDetails{name,firstName,familyName,dateOfBirth},emailOrUserName,customFields{value,customField{name}}}",
    limit: 200,
  });
};

export const getActiveMembers = async () => {
  const members = await getMembers();

  return members.filter((member) => {
    // Filter out pending applications
    if (member._isApplication) {
      return false;
    }
    // Filter out past members
    if (member.resignationDate) {
      return new Date(member.resignationDate) > new Date();
    }

    return true;
  });
};

const eventSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  start: z.string(),
  end: z.string().nullable(),
  locationName: z.string().nullable(),
  isPublic: z.boolean(),
  _deletedBy: z.string().nullable(),
  customFields: z.array(customFieldSchema),
});

export const getEvents = async () => {
  const today = new Date();
  today.setHours(1, 0, 0, 0);

  return await get("event", z.array(eventSchema), {
    query:
      "{id,name,description,start,end,locationName,isPublic,_deletedBy,customFields{value,customField{name}}}",
    limit: 200,
    start__gte: today.toISOString(),
  });
};
