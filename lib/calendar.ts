import { parseISO } from "date-fns";
import ical from "ical";
import { z } from "zod";

// Todo: Filter for [WEBSITE] tag
// Todo: Update [MEMBERS ONLY] tag handling

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
    .filter(({ type, summary, start }) => {
      if (!type.includes("VEVENT")) return false;
      if (!summary) return false;
      if (!start) return false;

      const startTime = parseISO(start.replace("\r", "")).getTime();
      if (startTime < nowTime) return false;

      return true;
    })
    .map((event) => {
      const startString = event.start as unknown as string;
      return {
        id: event.uid,
        title: event.summary,
        description: event.description,
        location: event.location,
        start: parseISO(startString.replace("\r", "")),
        membersOnly: event?.description?.includes("MEMBERS ONLY."),
      };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  return events;
};
