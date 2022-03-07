import type { GetStaticProps } from 'next';

import { Button } from '../components/Button';
import { Page } from '../components/Page';
import { Profile, Calendar, Watch, Arrow, Location } from 'icons';
import { allEvents, Event } from 'contentlayer/generated';

interface Props {
  events: Event[];
}

export default function Events({ events }: Props) {
  return (
    <Page
      title="Stammtisch"
      description="Der nächste Termin des Makers League Stammtisch"
      slug="stammtisch"
    >
      <section>
        <h1 className="mb-16 text-xl font-bold md:text-5xl">
          Stammtisch & Events
        </h1>
        <div className="space-y-24">
          {events.map((event) => (
            <article key={event._id}>
              <h2 className="mb-2 text-base font-bold md:text-2xl">
                {event.title}
              </h2>
              <p className="mb-4 text-base opacity-60 md:text-2xl">
                {event.subtitle}
              </p>
              <ul className="mb-8 flex flex-wrap gap-4 md:gap-8">
                <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
                  <Location className="text-xl" />
                  <span>{event.location}</span>
                </li>
                <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
                  <Calendar className="text-xl" />
                  <span>{event.dateFormatted}</span>
                </li>
                <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
                  <Watch className="text-xl" />
                  <span>{event.time}</span>
                </li>
                <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
                  <Profile className="text-xl" />
                  <span>{event.scale}</span>
                </li>
              </ul>
              <div
                className="prose mb-8"
                dangerouslySetInnerHTML={{ __html: event.body.html }}
              ></div>
              {event.cta && (
                <Button as="a" color="pink" href={event.cta.link}>
                  <Arrow className="text-2xl" />
                  {event.cta.text}
                </Button>
              )}
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const events = allEvents.sort((a, b) => {
    const aInNumber = Number(new Date(a.date));

    if (isNaN(aInNumber)) return -1; // Non formatted date comes first (e.g. Stammtisch)

    const bInNumber = Number(new Date(b.date));
    return aInNumber - bInNumber;
  });
  return { props: { events } };
};
