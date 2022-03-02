import Link from 'next/link';

import { Arrow } from 'icons';
import { Button } from './Button';

export function Faqs() {
  return (
    <section id="faqs">
      <h2 className="mb-2 text-base font-bold md:text-2xl">FAQs</h2>
      <p className="mb-10 text-base opacity-60 md:text-2xl">
        Häufige Fragen und deren Antworten
      </p>
      <div className="mb-14 flex flex-col flex-wrap gap-14 md:flex-row">
        <div className="w-full md:w-[calc(50%-28px)]">
          <h3 className="mb-2 font-bold">Was ist die Makers League?</h3>
          <p className="opacity-80">
            Die Makers League ist ein Verein, in dem sich Gründerinnen und
            Kleinstunternehmer, Firmen, Betriebe, Tüftlerinnen und Pioniere
            zusammentun. Uns alle verbindet, dass wir in und um Esslingen am
            Neckar unternehmerisch tätig sind oder sein möchten – und dass wir
            uns dabei als Netzwerk gegenseitig unterstützen!
          </p>
        </div>
        <div className="w-full md:w-[calc(50%-28px)]">
          <h3 className="mb-2 font-bold">Für wen ist die Makers League?</h3>
          <p className="opacity-80">
            Die Makers League ist für alle, die dafür brennen, eine eigene Idee
            umzusetzen. Egal ob du deine Idee noch suchst, sie schon eine Weile
            in deinem Hinterkopf trägst oder bereits realisierst.
            <span className="text-pink underline">Hier</span> kannst du
            herausfinden, ob du zur Makers League passt.
          </p>
        </div>
        <div className="w-full md:w-[calc(50%-28px)]">
          <h3 className="mb-2 font-bold">Was macht die Makers League?</h3>
          <p className="opacity-80">
            Wir bieten eine Community, in der sich lokale Macher:innen
            vernetzen, austauschen und gegenseitig unterstützen können. Mit
            Know-How, Kontakten, Motivation, gemeinsamen Veranstaltungen und
            vielem mehr hast du hier das optimale Umfeld, um deine Idee zum
            Fliegen zu bringen.
          </p>
        </div>
        <div className="w-full md:w-[calc(50%-28px)]">
          <h3 className="mb-2 font-bold">Wer ist bei euch schon Mitglied?</h3>
          <p className="opacity-80">
            Wir sind ein
            <span className="text-pink underline">
              {' '}
              bunter Haufen von Macher:innen
            </span>{' '}
            jeglichen Alters & aus ganz verschiedenen Branchen. Ob
            Café-Betreiberin oder Produkt-Entwickler, Software-Spezialist oder
            Traurednerin bis hin zum Konflikt-Coach ist alles vertreten. Nur du
            fehlst noch!
          </p>
        </div>
      </div>
      <Link href="/faqs" passHref>
        <Button as="a">
          <Arrow className="text-2xl" />
          Alle FAQs
        </Button>
      </Link>
    </section>
  );
}
