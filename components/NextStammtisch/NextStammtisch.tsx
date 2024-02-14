import { parseISO } from "date-fns";
import { getNextEvent } from "lib/events";
import { formatDate } from "lib/utils";
import { NextStammtischClient } from "./NextStammtischClient";

export const NextStammtisch = async () => {
  const event = await getNextEvent("stammtisch");
  if (!event || !event.start || !event.url) return null;

  const startDate =
    typeof event.start === "string" ? parseISO(event.start) : event.start;
  const formatedDate = formatDate(startDate, "dd.MM.");

  return (
    <NextStammtischClient id={event.id} date={formatedDate} url={event.url} />
  );
};
