import { parseISO } from "date-fns";
import { getNextEvent } from "lib/events";
import { formatDate } from "lib/utils";
import { NextEventClient } from "./NextEventClient";

export const NextEvent = async () => {
  const event = await getNextEvent();
  if (!event || !event.start || !event.url) return null;

  const startDate =
    typeof event.start === "string" ? parseISO(event.start) : event.start;
  const formatedDate = formatDate(startDate, "dd.MM.");

  return (
    <NextEventClient
      id={event.id}
      name={event.name}
      date={formatedDate}
      url={event.url}
    />
  );
};
