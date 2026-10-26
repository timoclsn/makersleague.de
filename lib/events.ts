import { addHours, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
  Beer,
  Briefcase,
  Calendar,
  Computer,
  GraduationCap,
  Lightbulb,
  Utensils,
  Wrench,
} from "lucide-react";
import { z } from "zod";
import { getCacheValue, setCacheValue } from "./cache";
import { customField, getEvents } from "./easyverein";

export const TIMEZONE = "Europe/Berlin";

// Assumed duration for events without an end time in easyVerein
const DEFAULT_EVENT_DURATION_IN_H = 2;

const eventIconMap = {
  "Master Class": GraduationCap,
  "After Work": Beer,
  Workshop: Wrench,
  "Office Day": Briefcase,
  Inspire: Lightbulb,
  Linux: Computer,
  "Makers Lunch": Utensils,
} as const;

export type WebsiteEvent = z.output<typeof websiteEventSchema>;
const websiteEventSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  location: z.string().nullable(),
  start: z.coerce.date(),
  end: z.coerce.date(),
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
      const show =
        customField(customFields, "Termin auf Website veröffentlichen")
          ?.value === "True";
      if (!show) return false;

      return true;
    })
    .map(({ id, name, description, locationName, start, end, isPublic }) => {
      const startDate = parseISO(start);
      const endDate = end ? parseISO(end) : null;
      return {
        id,
        name,
        description,
        location: locationName,
        start: toZonedTime(startDate, TIMEZONE),
        end: toZonedTime(
          endDate && endDate > startDate
            ? endDate
            : addHours(startDate, DEFAULT_EVENT_DURATION_IN_H),
          TIMEZONE,
        ),
        membersOnly: !isPublic,
        url: `https://easyverein.com/public/ML/calendar/${id}`,
      };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  setCacheValue("events", websiteEvents);

  return websiteEvents;
};

export const getNextEvent = async (name?: string) => {
  const events = await getWebsiteEvents();

  if (name) {
    return events.find((event) => {
      return event.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  return events[0];
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
