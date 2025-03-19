import { Arrow, Calendar } from "components/icons";
import { eventIcon, getWebsiteEvents } from "lib/events";
import { htmlToString } from "lib/text";
import { formatDate } from "lib/utils";
import { ReactNode } from "react";
import { Button } from "./Button";
import { Track } from "./Track";

export const EventsSection = async () => {
  const events = await getWebsiteEvents();
  const nextEvents = events.slice(0, 3);
  return (
    <section id="next-events" className="bg-pink p-8 text-light">
      <h2 className="mb-2 text-base font-bold lg:text-2xl">Nächste Events</h2>
      <p className="mb-10 text-base opacity-60 lg:text-2xl">
        Komm vorbei und treffe andere Macher:innen!
      </p>

      <ul className="mb-14 grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-8">
        {nextEvents.map((event) => {
          const Icon = eventIcon(event.name);
          const formattedDate = `${formatDate(event.start, "dd. MMM yyyy | HH")} Uhr`;
          return (
            <li key={event.id} className="flex flex-col justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <Icon className="size-4 flex-none lg:size-6" />
                  <h2
                    className="truncate text-base font-bold lg:text-xl"
                    title={event.name}
                  >
                    {event.name}
                  </h2>
                </div>
                <ul className="mb-8 flex flex-wrap gap-2 text-sm">
                  <Tag>
                    <Calendar />
                    {formattedDate}
                  </Tag>
                </ul>
                {event.description && (
                  <div className="prose prose-p:text-pink-light">
                    <p className="line-clamp-2 sm:line-clamp-3 lg:line-clamp-5">
                      {htmlToString(event.description)}
                    </p>
                  </div>
                )}
              </div>
              {event.url && (
                <Track
                  event="Event section more clicked"
                  data={{
                    name: event.name,
                    date: formattedDate,
                  }}
                  className="mt-8 flex flex-col md:items-start"
                >
                  <Button
                    color="light"
                    variant="outline"
                    size="small"
                    href={event.url}
                    target="_blank"
                    rel="noopener"
                  >
                    <Arrow className="text-2xl" />
                    Mehr
                  </Button>
                </Track>
              )}
            </li>
          );
        })}
      </ul>
      <Button color="light" variant="solid" size="medium" href="/events">
        <Calendar className="text-2xl" />
        Alle Events
      </Button>
    </section>
  );
};

interface TagProps {
  children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
  return (
    <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-2 py-1 font-bold text-pink">
      {children}
    </li>
  );
};
