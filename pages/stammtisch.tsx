import type { NextPage } from 'next';

import { Button } from '../components/Button';
import { Page } from '../components/Page';
import { Profile, Calendar, Watch, Arrow } from 'icons';

const Events: NextPage = () => {
  return (
    <Page>
      <div className="space-y-20 md:space-y-32">
        <h1 className="mb-6 text-xl font-bold md:text-5xl">Stammtisch</h1>
        <article>
          <h2 className="mb-2 text-base font-bold md:text-2xl">Stammtisch</h2>
          <p className="mb-4 text-base opacity-60 md:text-2xl">
            Jeden 2. und 4. Dienstag im Monat
          </p>
          <ul className="mb-8 flex flex-wrap gap-4 md:gap-8">
            <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
              <Profile className="text-xl" />
              <span>Online / Digital</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
              <Calendar className="text-xl" />
              <span>2. und 4. Dienstag im Monat</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
              <Watch className="text-xl" />
              <span>18 Uhr</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-pink-light px-3 py-1 font-bold text-pink">
              <Profile className="text-xl" />
              <span>Jeder ist willkommen!</span>
            </li>
          </ul>
          <p className="mb-8">
            Jeden zweiten und vierten Dienstag im Monat treffen wir uns um 18
            Uhr virtuell in einem wonder.me Space zum Stammisch. Sofern es keine
            Updates aus dem Vorstandsteam gibt, ist das einfach ein
            ungezwungenes und Agenda-loses Zusammentreffen von
            Vereinsmitgliedern und Interessierten.
            <br />
            <br />
            Solltest du also an der Makers League interessiert sein und möchtest
            uns gerne mal kennenlernen, dann ist der Stammtisch der Ideale Ort
            dafür!
            <br />
            <br />
            Wenn du dabei sein möchtest, ist es hilfreich, wenn du dich vorab
            über den Link unten anmeldest. So wissen wir Bescheid und können uns
            entsprechend vorbereiten. Außerdem erhälst du so den Link zum
            wonder.me Space und alle wichtigen Informationen.
            <br />
            <br />
            Zur Anmeldung gelangst du, indem du den Button unten drückst und
            dann im Kalender den jeweiligen Stammtisch-Termin klickst. Du
            gelangst dann auf ein Anmeldeformular.
            <br />
            <br />
            Wir freuen uns auf dich!
          </p>
          <Button color="pink">
            <Arrow className="text-2xl" />
            Anmelden
          </Button>
        </article>
      </div>
    </Page>
  );
};

export default Events;
