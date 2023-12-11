import { Calendar, FormInput, PartyPopper, ScrollText } from "lucide-react";
import { ApplyButton } from "./ApplyButton";
import { Button } from "./Button";

export const ApplySection = () => {
  return (
    <section id="application-process">
      <h2 className="mb-2 text-base font-bold md:text-2xl">Mitglied werden</h2>
      <p className="mb-10 text-base opacity-60 md:text-2xl">
        So kannst du Mitglied in der Makers League werden
      </p>
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <li className="flex flex-col justify-between border-4 p-4 text-center text-dark sm:p-8">
          <div>
            <div className="mb-8 flex justify-center">
              <div className="flex items-center justify-center rounded-full bg-green p-6 text-light">
                <ScrollText size={56} />
              </div>
            </div>
            <h3 className="mb-2 text-base font-bold opacity-80 md:text-2xl">
              Schritt 1: Bewerbung
            </h3>
            <p className="mb-14">
              Fülle das Bewerbungsformular aus (ca. 5min).
            </p>
          </div>
          <ApplyButton color="green" />
        </li>
        <li className="flex flex-col justify-between border-4 p-4 text-center text-dark sm:p-8">
          <div>
            <div className="mb-8 flex justify-center">
              <div className="flex items-center justify-center rounded-full bg-pink p-6 text-light">
                <Calendar size={56} />
              </div>
            </div>
            <h3 className="mb-2 text-base font-bold opacity-80 md:text-2xl">
              Schritt 2: Event
            </h3>
            <p className="mb-14">
              Besuche ein Event oder Stammtisch im Makers Inn.
            </p>
          </div>
          <Button href="/events" color="pink">
            <Calendar className="text-2xl" />
            Events
          </Button>
        </li>
        <li className="flex flex-col justify-between border-4 p-4 text-center text-dark sm:p-8">
          <div>
            <div className="mb-8 flex justify-center">
              <div className="flex items-center justify-center rounded-full bg-sand p-6 text-dark">
                <FormInput size={56} />
              </div>
            </div>
            <h3 className="mb-2 text-base font-bold opacity-80 md:text-2xl">
              Schritt 3: Mitgliedsantrag
            </h3>
            <p className="mb-14">
              Wir passen zusammen! Dann bekommst du ein Mitgliedsantrag von uns
              zugesendet.
            </p>
          </div>
        </li>
        <li className="flex flex-col justify-between border-4 p-4 text-center text-dark sm:p-8">
          <div>
            <div className="mb-8 flex justify-center">
              <div className="flex items-center justify-center rounded-full bg-blue p-6 text-dark">
                <PartyPopper size={56} />
              </div>
            </div>
            <h3 className="mb-2 text-base font-bold opacity-80 md:text-2xl">
              Schritt 4: Los geht&apos;s
            </h3>
            <p className="mb-14">
              Du bekommst beim nächsten Event eine Einführung & einen Zugang
              für&apos;s Makers Inn.
            </p>
          </div>
        </li>
      </ol>
    </section>
  );
};
