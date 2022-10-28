import Image from 'next/image';

import { Heart, Storm } from 'icons';

export function FitSection() {
  return (
    <section className="relative bg-sand p-8 last:mb-16" id="fit">
      <h2 className="mb-2 text-base font-bold md:text-2xl">
        Passe ich zur Makers League?
      </h2>
      <p className="mb-10 text-base opacity-60 md:text-2xl">
        Finde heraus, ob wir zusammen passen!
      </p>
      <div className="mb-32 flex flex-col gap-14 md:flex-row">
        <div>
          <div className="mb-2 flex items-center gap-2 ">
            <Heart className="text-2xl" />
            <h3 className="font-bold">Wir sind ein perfect match, wenn:</h3>
          </div>
          <ul className="ml-5 list-disc">
            <li>
              du eine Idee hast, für die du brennst oder auf der Suche nach
              einer Idee bist
            </li>
            <li>du eigenverantwortlich deine Idee vorantreibst</li>
            <li>
              du die Innovations- & Gründungskultur in Esslingen mit deiner Idee
              bereichern möchtest
            </li>
            <li>du ein offenes Mindset hast </li>
            <li>du gemeinsam lernen willst</li>
            <li>du andere mit deinem Know-how unterstützen möchtest</li>
            <li>du einfach machen willst!</li>
          </ul>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Storm className="text-2xl" />
            <h3 className="font-bold">Wir passen nicht zusammen, wenn:</h3>
          </div>
          <ul className="ml-5 list-disc">
            <li>du nichts mit der Community zu tun haben möchtest</li>
            <li>du nur einen Raum zum Arbeiten oder für Meetings suchst</li>
            <li>
              du nichts zur Innovations- & Gründungskultur in Esslingen
              beitragen möchtest
            </li>
            <li>du lediglich Raum und Menschen für dein Hobby suchst</li>
            <li>du erwartest, dass der Verein deine Idee umsetzt</li>
            <li>du forderst, aber nichts beitragen möchtest</li>
          </ul>
        </div>
      </div>
      <div className="absolute left-[calc(50%-150px)] bottom-0 -mb-8 w-[300px] md:left-[calc(50%-300px)] md:-mb-16 md:w-[600px]">
        <Image
          src="/assets/doodle-pointing.svg"
          alt="Doodle Pointing"
          width={600}
          height={200}
        />
      </div>
    </section>
  );
}
