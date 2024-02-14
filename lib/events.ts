import { parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { customField, getEvents } from "./easyverein";

const TIMEZONE = "Europe/Berlin";

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
    if (!event.name) return false;
    return event.name.toLowerCase().includes(name.toLowerCase());
  });
};
