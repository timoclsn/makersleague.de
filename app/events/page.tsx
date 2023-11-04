import { StructuredData } from "components/StructuredData";
import { formatISO } from "date-fns";
import { Calendar, Location, Profile } from "icons";
import { getEventsCached } from "lib/calendar";
import { formatDate } from "lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Makers League Events",
};

const EventsPage = async () => {
  const events = await getEventsCached();

  return (
    <>
      {events.map((event) => (
        <StructuredData key={event.id} type="Event">
          {{
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
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
      ))}
      <section>
        <h1 className="mb-16 text-xl font-bold md:text-5xl">
          Stammtisch & Events
        </h1>
        {events.length > 0 ? (
          <div className="space-y-24">
            {events.map((event) => (
              <article key={event.id}>
                <h2 className="mb-4 text-base font-bold md:text-2xl">
                  {event.title}
                </h2>
                <ul className="mb-8 flex flex-wrap gap-4 md:gap-8">
                  {event.location && (
                    <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
                      <Location className="text-xl" />
                      {event.location}
                    </li>
                  )}
                  <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
                    <Calendar className="text-xl" />
                    {`${formatDate(event.start, "dd. MMM yyyy | HH")} Uhr`}
                  </li>
                  <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
                    <Profile className="text-xl" />
                    {event.membersOnly
                      ? "Nur für Mitglieder"
                      : "Jeder ist willkommen!"}
                  </li>
                </ul>
                {event.description && (
                  <div
                    className="prose mb-8"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                )}
              </article>
            ))}
          </div>
        ) : (
          <h2 className="mb-4 text-base font-bold md:text-2xl">
            Keine anstehenden Events
          </h2>
        )}
      </section>
    </>
  );
};

export default EventsPage;
