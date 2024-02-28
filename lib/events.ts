import { parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import {
  Beer,
  Briefcase,
  Calendar,
  Computer,
  GraduationCap,
  Lightbulb,
  Wrench,
} from "lucide-react";
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

export const getWebsiteEvents = async () => {
  const events = await getEvents();
  const nowTime = new Date().getTime();

  return events
    .filter(({ start, customFields }) => {
      const startTime = parseISO(start).getTime();
      if (startTime < nowTime) return false;

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
        icon: eventIcon(name),
        name,
        description,
        location: locationName,
        start: utcToZonedTime(parseISO(start), TIMEZONE),
        membersOnly: !isPublic,
        url: `https://easyverein.com/public/ML/calendar/${id}`,
      };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());
};

export const getNextEvent = async (name: string) => {
  const events = await getWebsiteEvents();
  return events.find((event) => {
    return event.name.toLowerCase().includes(name.toLowerCase());
  });
};

const eventIcon = (name: string) => {
  for (const key in eventIconMap) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return eventIconMap[key as keyof typeof eventIconMap];
    }
  }

  return Calendar;
};
