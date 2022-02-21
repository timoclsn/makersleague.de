import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { Page } from '../components/Page';
import { Button } from '../components/Button';
import HeartPlus from '../assets/ic-heartPlus.svg';
import Question from '../assets/ic-question.svg';
import Check from '../assets/ic-check.svg';
import Clipboard from '../assets/ic-clipboard.svg';
import DocumentInfo from '../assets/ic-documentInfo.svg';

const Home: NextPage = () => {
  return (
    <Page>
      <div className="space-y-14">
        <section>
          <h1 className="mb-6 text-5xl font-bold">Über uns</h1>
          <div className="flex flex-col space-y-12 space-x-0 md:flex-row md:space-x-12 md:space-y-0">
            <p>
              Wir sind Veränderer, Voranbringerinnen, Erfinder, Umkremplerinnen
              – wir sind Macher. Die Makers League ist ein Verein, in dem sich
              Gründer*innen und Kleinstunternehmer, Firmen, Betriebe,
              Tüftler*innen und Pioniere zusammentun. Uns alle verbindet, dass
              wir in und um Esslingen am Neckar unternehmerisch tätig sind oder
              sein möchten und dass wir uns dabei als Netzwerk gegenseitig
              unterstützen.
              <br />
              <br />
              Mit Know-How, Kontakten, Motivation, gemeinsamen Veranstaltungen
              und vielem mehr. Dabeisein können alle, die selbst Macher sind
              oder die Arbeit der Makers League fördern wollen. Wir setzen uns
              für ein modernes, innovatives Esslingen ein, in dem kreativer
              Unternehmergeist entstehen und wachsen kann.
              <br />
              <br />
              Die Superkräfte, die uns dabei antreiben, heißen Mut und
              Hilfsbereitschaft, Optimismus und Vertrauen, in uns, in euch und
              in die ganze Region.
            </p>
            <div className="relative flex flex-col overflow-hidden bg-blue p-6">
              <h2 className="mb-4 text-2xl font-bold">Unsere Werte</h2>
              <h3 className="mb-2 font-bold">
                OMG – Offenheit, Machen & Gemeinschaft
              </h3>
              <p>
                Das Zusammenleben in unserer Community basiert auf drei
                Kernwerten. Bei uns steht die Abkürzung OMG nicht für „Oh my
                God“, sondern für Offenheit, Machen & Gemeinschaft. Mehr Infos
                zu unseren Werten findest du hier.
              </p>
              <div className="mt-20 flex flex-1 flex-col-reverse">
                <Link href="/ueber#werte">
                  <a className="font-bold text-blue-accent">mehr</a>
                </Link>
              </div>
              <div className="absolute right-0 bottom-0 -mb-10 -mr-6 w-[150px]">
                <Image
                  src="/assets/doodle-loving-blue.svg"
                  alt="Doodle Loving"
                  layout="responsive"
                  width={300}
                  height={336}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="spaxe-x-0 flex flex-col items-start space-y-6 md:flex-row md:items-center md:space-y-0 md:space-x-9">
          <Button>
            <HeartPlus className="text-2xl" />
            Mitglied werden
          </Button>
          <Button variant="link">
            <Question className="text-2xl" />
            FAQs
          </Button>
          <Button variant="link">
            <Check className="text-2xl" />
            Passe ich zur ML?
          </Button>
          <Button variant="link">
            <Clipboard className="text-2xl" />
            Satzung
          </Button>
          <Button variant="link">
            <DocumentInfo className="text-2xl" />
            Beitragsordnung
          </Button>
        </section>
      </div>
    </Page>
  );
};

export default Home;
