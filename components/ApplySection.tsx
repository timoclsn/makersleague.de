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
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li className="border-dark text-dark flex flex-col justify-between border-4 p-4 text-center sm:p-8">
          <div>
            <div className="mb-8 flex justify-center">
              <div className="bg-pink text-light flex items-center justify-center rounded-full p-6">
                <Calendar size={56} />
              </div>
            </div>
            <h3 className="mb-2 text-base font-bold opacity-80 md:text-2xl">
              Schritt 1: Event
            </h3>
            <p className="mb-14">
              Besuche ein Event oder After Work im Makers Inn.
            </p>
          </div>
          <Button href="/events" color="pink">
            <Calendar className="text-2xl" />
            Events
          </Button>
        </li>
        <li className="border-dark text-dark flex flex-col justify-between border-4 p-4 text-center sm:p-8">
          <div>
            <div className="mb-8 flex justify-center">
              <div className="bg-green text-light flex items-center justify-center rounded-full p-6">
                <FormInput size={56} />
              </div>
            </div>
            <h3 className="mb-2 text-base font-bold opacity-80 md:text-2xl">
              Schritt 2: Bewerbung
            </h3>
            <p className="mb-14">
              Es hat KLICK gemacht? Fülle jetzt die Bewerbung aus.
            </p>
          </div>
          <ApplyButton />
        </li>
        <li className="border-dark text-dark flex flex-col justify-between border-4 p-4 text-center sm:p-8">
          <div>
            <div className="mb-8 flex justify-center">
              <div className="bg-blue text-dark flex items-center justify-center rounded-full p-6">
                <PartyPopper size={56} />
              </div>
            </div>
            <h3 className="mb-2 text-base font-bold opacity-80 md:text-2xl">
              Schritt 3: Los geht&apos;s
            </h3>
            <p className="mb-14">
              Du bekommst in deiner Welcome Mail alle wichtigen Infos für deinen
              Start bei uns.
            </p>
          </div>
        </li>
      </ol>
    </section>
  );
};
