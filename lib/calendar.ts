import { parseISO } from "date-fns";
import ical from "ical";
import { z } from "zod";

const calendarUrl = z.string().parse(process.env.CALENDAR_URL);

export const getEvents = async () => {
  const response = await fetch(calendarUrl);
  const body = await response.text();
  const rawCalendarData = ical.parseICS(body);
  const calenderDataArray = Object.values(rawCalendarData);
  const now = new Date();

  const events = calenderDataArray
    .map((event) => {
      const startString = event.start as unknown as string;
      return {
        id: event.uid,
        type: event.type,
        title: event.summary,
        description: event.description,
        location: event.location,
        start: parseISO(startString.replace("\r", "")),
        membersOnly: event?.description?.includes("MEMBERS ONLY."),
      };
    })
    .filter(({ type, title, start }) => {
      if (!type.includes("VEVENT")) return false;
      if (!title) return false;
      if (!start) return false;

      const nowTime = now.getTime();
      const startTime = start.getTime();
      if (startTime < nowTime) return false;

      return true;
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  return events;
};
