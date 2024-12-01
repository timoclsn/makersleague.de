import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
  Beer,
  Briefcase,
  Calendar,
  Computer,
  GraduationCap,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { z } from "zod";
import { getCacheValue, setCacheValue } from "./cache";
import { customField, getEvents } from "./easyverein";

const TIMEZONE = "Europe/Berlin";

const eventIconMap = {
  Masterclass: GraduationCap,
  Stammtisch: Beer,
  Workshop: Wrench,
  "Office Day": Briefcase,
  Inspire: Lightbulb,
  Linux: Computer,
} as const;

export type WebsiteEvent = z.output<typeof websiteEventSchema>;
const websiteEventSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  location: z.string().nullable(),
  start: z.coerce.date(),
  membersOnly: z.boolean(),
  url: z.string().url(),
});

export const getWebsiteEvents = async (): Promise<WebsiteEvent[]> => {
  const cachedData = await getCacheValue("events", z.array(websiteEventSchema));
  if (cachedData) {
    console.info("Events loaded from cache");
    return cachedData;
  }

  console.info("Fetching events from API");

  const events = await getEvents();

  const websiteEvents = events
    .filter(({ _deletedBy, customFields }) => {
      if (_deletedBy) return false;
      if (!customFields) return false;
      const show =
        customField(customFields, "Termin auf Website veröffentlichen")
          ?.value === "True";
      if (!show) return false;

      return true;
    })
    .map(({ id, name, description, locationName, start, isPublic }) => {
      return {
        id,
        name,
        description,
        location: locationName,
        start: toZonedTime(parseISO(start), TIMEZONE),
        membersOnly: !isPublic,
        url: `https://easyverein.com/public/ML/calendar/${id}`,
      };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  setCacheValue("events", websiteEvents);

  return websiteEvents;
};

export const getNextEvent = async (name: string) => {
  const events = await getWebsiteEvents();
  return events.find((event) => {
    return event.name.toLowerCase().includes(name.toLowerCase());
  });
};

export const eventIcon = (name: string) => {
  for (const key in eventIconMap) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return eventIconMap[key as keyof typeof eventIconMap];
    }
  }

  return Calendar;
};

export const makersInn = (location: string) => {
  return location.includes("Makers Inn");
};
