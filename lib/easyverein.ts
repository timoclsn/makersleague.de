import { z } from "zod";

const { EASYVEREIN_TOKEN } = process.env;

const VERSION = "v1.6";
const DOMAIN = "easyverein.com";
const URL = `https://${DOMAIN}/api/${VERSION}`;

type Endpoint = "member" | "event";

const headers = {
  Authorization: `Token ${EASYVEREIN_TOKEN}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};

interface GetOptions {
  id?: string;
  query?: string;
  limit?: number;
  page?: number;
  params?: string;
  start__gte?: string;
}

export const get = async <TSchema extends z.ZodTypeAny>(
  endpoint: Endpoint,
  schema: TSchema,
  options: GetOptions = {},
) => {
  const searchParams = new URLSearchParams();
  if (options.query) searchParams.set("query", options.query);
  if (options.limit) searchParams.set("limit", String(options.limit));
  if (options.page) searchParams.set("page", String(options.page));
  if (options.params) searchParams.set("params", options.params);
  if (options.start__gte) searchParams.set("start__gte", options.start__gte);
  const searchParamsString = searchParams.toString();

  const fetchUrl = `${URL}/${endpoint}${options.id ? "/" + options.id : ""}${searchParamsString ? "?" + searchParamsString : ""}`;

  let results: z.output<TSchema> = [];

  const res = await fetch(fetchUrl, {
    method: "GET",
    headers,
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${fetchUrl}. Status ${res.status} ${res.statusText}`,
    );
  }

  const data = await res.json();
  results = schema.parse(data.results);

  let next = data.next;

  while (next) {
    const res = await fetch(next, {
      method: "GET",
      headers,
      next: {
        revalidate: 60,
      },
    });
    const data = await res.json();
    results = [...results, ...schema.parse(data.results)];
    next = data.next;
  }

  return results;
};

export const customField = (customFields: CustomField[], name: string) =>
  customFields?.find((customField) => customField.customField.name === name);

type CustomField = z.infer<typeof customFieldSchema>;
const customFieldSchema = z.object({
  value: z.string(),
  customField: z.object({
    name: z.string(),
  }),
});

const memberSchema = z.object({
  id: z.number(),
  resignationDate: z.string().nullable(),
  _isApplication: z.boolean(),
  _profilePicture: z.string().optional(),
  contactDetails: z.object({
    name: z.string(),
    firstName: z.string(),
    familyName: z.string(),
  }),
  customFields: z.array(customFieldSchema).nullable(),
});

export const getMembers = async () => {
  return await get("member", z.array(memberSchema), {
    query:
      "{id,resignationDate,_isApplication,_profilePicture,contactDetails{name,firstName,familyName},customFields{value,customField{name}}}",
    limit: 200,
  });
};

const eventSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  start: z.string(),
  locationName: z.string().nullable(),
  isPublic: z.boolean(),
  customFields: z.array(customFieldSchema).nullable(),
});

export const getEvents = async () => {
  const today = new Date();
  today.setHours(1, 0, 0, 0);

  return await get("event", z.array(eventSchema), {
    query:
      "{id,name,description,start,locationName,isPublic,customFields{value,customField{name}}}",
    limit: 200,
    start__gte: today.toISOString(),
  });
};
