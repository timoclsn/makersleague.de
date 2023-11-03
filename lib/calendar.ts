import { parseISO } from "date-fns";
import ical from "ical";
import { z } from "zod";

const MEMBERS_ONLY_TAG = "[MEMBERS ONLY]";
const WEBSITE_TAG = "[WEBSITE]";

const calendarUrl = z.string().parse(process.env.CALENDAR_URL);

const eventSchema = z.object({
  uid: z.string(),
  type: z.string(),
  summary: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  start: z.string().optional(),
});

export const getEvents = async () => {
  const response = await fetch(calendarUrl);
  const body = await response.text();
  const rawCalendarData = ical.parseICS(body);
  const calenderDataArray = Object.values(rawCalendarData);
  const parsedCalenderDataArray = z.array(eventSchema).parse(calenderDataArray);
  const nowTime = new Date().getTime();

  const events = parsedCalenderDataArray
    .filter(({ type, summary, description, start }) => {
      if (!type.includes("VEVENT")) return false;
      if (!summary) return false;
      if (!description) return false;
      if (!start) return false;
      if (!description.includes(WEBSITE_TAG)) return false;

      const startTime = parseISO(start.replace("\r", "")).getTime();
      if (startTime < nowTime) return false;

      return true;
    })
    .map((event) => {
      const startString = event.start as unknown as string;
      const description = event.description;
      const cleanDescription = description
        ?.replace(MEMBERS_ONLY_TAG, "")
        .replace(WEBSITE_TAG, "");
      return {
        id: event.uid,
        title: event.summary,
        description: cleanDescription,
        location: event.location,
        start: parseISO(startString.replace("\r", "")),
        membersOnly: description?.includes(MEMBERS_ONLY_TAG),
      };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  return events;
};
