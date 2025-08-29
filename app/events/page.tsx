import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "components/Button";
import { CopyCalendarUrlButton } from "components/CopyCalendarUrlButton";
import { Arrow, Calendar, Location, Profile } from "components/icons";
import { PageContent } from "components/layouts/PageContent";
import { StructuredData } from "components/StructuredData";
import { Track } from "components/Track";
import { formatISO } from "date-fns";
import { Route } from "next";
import { eventIcon, getWebsiteEvents, makersInn } from "lib/events";
import { formatDate } from "lib/utils";
import { CalendarX } from "lucide-react";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Events",
  description: "Makers League Events",
};

const EventsPage = async () => {
  const events = await getWebsiteEvents();

  return (
    <PageLayout>
      {events.map((event) => {
        return (
          <StructuredData key={event.id} type="Event">
            {{
              "@context": "https://schema.org",
              "@type": "Event",
              name: event.name,
              startDate: formatISO(event.start),
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "Place",
                name: "Makers Inn",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Küferstraße 46",
                  addressLocality: "Esslingen am Neckar",
                  postalCode: "73728",
                  addressRegion: "BW",
                  addressCountry: "DE",
                },
              },
              description: event.description,
              organizer: {
                "@type": "Organization",
                name: "Makers League e.V.",
                url: "https://makersleague.de",
              },
            }}
          </StructuredData>
        );
      })}
      <PageContent>
        <section>
          <h1 className="mb-8 text-xl font-bold md:text-5xl">
            Stammtisch & Events
          </h1>
          <div className="mb-24 flex flex-col gap-4 sm:flex-row">
            <Button
              color="pink"
              variant="outline"
              size="small"
              href="https://easyverein.com/public/ML/calendar"
              target="_blank"
              rel="noopener"
            >
              <Calendar className="text-2xl" />
              Zum Kalender
            </Button>
            <CopyCalendarUrlButton />
          </div>
          {events.length > 0 ? (
            <div className="space-y-24">
              {events.map((event) => {
                const Icon = eventIcon(event.name);
                const isMakersInn = makersInn(event.location ?? "");
                const formattedDate = `${formatDate(event.start, "dd. MMM yyyy | HH")} Uhr`;
                return (
                  <article key={event.id}>
                    <div className="mb-2 flex items-center gap-3">
                      <Icon className="size-4 flex-none md:size-6" />
                      <h2 className="text-base font-bold md:text-2xl">
                        {event.name}
                      </h2>
                    </div>
                    <ul className="mb-8 flex flex-wrap gap-4 md:gap-8">
                      {event.location &&
                        (isMakersInn ? (
                          <a
                            href="https://maps.app.goo.gl/bgpY6u8SerF1wMbZ8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80"
                          >
                            <Tag>
                              <Location className="text-xl" />
                              Makers Inn
                            </Tag>
                          </a>
                        ) : (
                          <Tag>
                            <Location className="text-xl" />
                            {event.location}
                          </Tag>
                        ))}
                      <Tag>
                        <Calendar className="text-xl" />
                        {formattedDate}
                      </Tag>
                      <Tag>
                        <Profile className="text-xl" />
                        {event.membersOnly
                          ? "Nur für Mitglieder"
                          : "Jede*r ist willkommen!"}
                      </Tag>
                    </ul>
                    {event.description && (
                      <div
                        className="prose mb-8"
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      />
                    )}
                    {event.url && (
                      <Track
                        event="Event page sign-up clicked"
                        data={{
                          name: event.name,
                          date: formattedDate,
                        }}
                      >
                        <Button
                          color="pink"
                          variant="outline"
                          size="small"
                          href={event.url as Route}
                          target="_blank"
                          rel="noopener"
                        >
                          <Arrow className="text-2xl" />
                          Anmelden
                        </Button>
                      </Track>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <h2 className="mb-4 flex items-center justify-center gap-4 text-base font-bold md:text-2xl">
                <CalendarX size={32} />
                Keine anstehenden Events
              </h2>
            </div>
          )}
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default EventsPage;

interface TagProps {
  children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
  return (
    <li className="bg-pink-light text-pink flex items-center justify-center gap-2 rounded-full px-3 py-1 font-bold">
      {children}
    </li>
  );
};
