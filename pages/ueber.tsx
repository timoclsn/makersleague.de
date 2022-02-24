import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { Page } from '../components/Page';
import { Button } from '../components/Button';
import alex from '../public/assets/alex.png';
import mitmachen from '../public/assets/mitmachen.png';
import {
  HeartPlus,
  Question,
  Check,
  DocumentInfo,
  Heart,
  Storm,
  Clipboard,
} from 'icons';

const Ueber: NextPage = () => {
  return (
    <Page>
      <div className="space-y-20 md:space-y-32">
        <section>
          <h1 className="mb-6 text-xl font-bold md:text-5xl">Über uns</h1>
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
        <section>
          <h2 className="mb-2 text-base font-bold md:text-2xl">
            Unsere Mitglieder
          </h2>
          <p className="mb-10 text-base opacity-60 md:text-2xl">
            Die Superhelden der Makers League
          </p>
          <ul className="mb-14 flex flex-wrap gap-4 md:gap-8">
            <li className="w-[calc(50%-8px)] border-4 p-4 md:w-[calc(33.33%-22px)]">
              <div className="mb-1">
                <Image src={alex} alt="Alex" placeholder="blur" />
              </div>
              <h3 className="text-base font-bold opacity-80 md:text-2xl">
                Alex Schulz
              </h3>
              <p className="pb-14">Social Media Marketing</p>
            </li>
            <li className="w-[calc(50%-8px)] border-4 border-dashed p-4  text-pink md:w-[calc(33.33%-22px)]">
              <div className="mb-1">
                <Image src={mitmachen} alt="Mitmachen" placeholder="blur" />
              </div>
              <h3 className="text-base font-bold opacity-80 md:text-2xl">
                Du?
              </h3>
              <p className="pb-14">Macher*in mit Bock etwas zu bewegen!</p>
            </li>
            <li className="w-[calc(50%-8px)] border-4 p-4 md:w-[calc(33.33%-22px)]">
              <div className="mb-1">
                <Image src={alex} alt="Alex" placeholder="blur" />
              </div>
              <h3 className="text-base font-bold opacity-80 md:text-2xl">
                Alex Schulz
              </h3>
              <p className="pb-14">Social Media Marketing</p>
            </li>
            <li className="w-[calc(50%-8px)] border-4 p-4 md:w-[calc(33.33%-22px)]">
              <div className="mb-1">
                <Image src={alex} alt="Alex" placeholder="blur" />
              </div>
              <h3 className="text-base font-bold opacity-80 md:text-2xl">
                Alex Schulz
              </h3>
              <p className="pb-14">Social Media Marketing</p>
            </li>
            <li className="w-[calc(50%-8px)] border-4 p-4 md:w-[calc(33.33%-22px)]">
              <div className="mb-1">
                <Image src={alex} alt="Alex" placeholder="blur" />
              </div>
              <h3 className="text-base font-bold opacity-80 md:text-2xl">
                Alex Schulz
              </h3>
              <p className="pb-14">Social Media Marketing</p>
            </li>
            <li className="w-[calc(50%-8px)] border-4 p-4 md:w-[calc(33.33%-22px)]">
              <div className="mb-1">
                <Image src={alex} alt="Alex" placeholder="blur" />
              </div>
              <h3 className="text-base font-bold opacity-80 md:text-2xl">
                Alex Schulz
              </h3>
              <p className="pb-14">Social Media Marketing</p>
            </li>
          </ul>
          <Button>Alle Mitglieder</Button>
        </section>
        <section className="relative bg-blue p-8">
          <h2 className="mb-2 text-base font-bold md:text-2xl">Unsere Werte</h2>
          <p className="mb-10 text-base opacity-60 md:text-2xl">
            OMG – Offenheit, Machen & Gemeinschaft
          </p>
          <div className="mb-16 flex flex-col gap-12 md:flex-row">
            <div>
              <h3 className="mb-2 font-bold">Offenheit</h3>
              <p className="opacity-80">
                <span className="font-bold underline">Wir sind offen.</span> Mit
                Neugier und Respekt heißen wir jede Idee, jeden Vorschlag, vor
                allem aber jeden Menschen willkommen. Ohne Vorbehalte und Angst
                vor Verwundbarkeit zeigen wir einander, wer wir sind, und
                schätzen die Vielfalt unserer Erfahrungen und Einsichten. In
                direktem, ehrlichem Austausch bringen wir viele Perspektiven
                zusammen und machen so Raum für das Überraschende.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-bold">Machen</h3>
              <p className="opacity-80">
                <span className="font-bold underline">Wir machen.</span> Dabei
                warten wir nicht auf andere und stellen die Zweifel hintenan.
                Wir geben einander durch unser Vorbild Mut, im Erfolg ebenso wie
                im Scheitern, denn wir schätzen jeden Versuch wert und lernen
                Tag für Tag dazu. Angehen, ausprobieren, aktiv werden, anstatt
                abzuwarten, bis sich etwas tut: Nur so entsteht Neues. Durch
                Machen, voller Zuversicht und Energie.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-bold">Gemeinschaft</h3>
              <p className="opacity-80">
                <span className="font-bold underline">
                  {' '}
                  Wir sind eine Gemeinschaft.
                </span>{' '}
                Wir vertrauen einander und nehmen Anteil an Fortschritt und
                Rückschlag gleichermaßen. So zeigen wir, dass Verlass
                aufeinander ist, wenn es Unterstützung braucht, und bieten diese
                ohne zu zögern an. Denn wir wissen, dass die helfende Hand von
                heute schon morgen selbst auf der Suche nach Rückhalt sein kann.
                So wachsen wir – zusammen.
              </p>
            </div>
          </div>
          <div className="absolute left-[calc(50%-75px)] bottom-0 -mb-8 w-[150px]">
            <Image
              src="/assets/doodle-loving-blue.svg"
              alt="Doodle Loving"
              layout="responsive"
              width={150}
              height={100}
            />
          </div>
        </section>
        <section>
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
                Neckar unternehmerisch tätig sind oder sein möchten – und dass
                wir uns dabei als Netzwerk gegenseitig unterstützen!
              </p>
            </div>
            <div className="w-full md:w-[calc(50%-28px)]">
              <h3 className="mb-2 font-bold">Für wen ist die Makers League?</h3>
              <p className="opacity-80">
                Die Makers League ist für alle, die dafür brennen, eine eigene
                Idee umzusetzen. Egal ob du deine Idee noch suchst, sie schon
                eine Weile in deinem Hinterkopf trägst oder bereits realisierst.
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
              <h3 className="mb-2 font-bold">
                Wer ist bei euch schon Mitglied?
              </h3>
              <p className="opacity-80">
                Wir sind ein
                <span className="text-pink underline">
                  {' '}
                  bunter Haufen von Macher:innen
                </span>{' '}
                jeglichen Alters & aus ganz verschiedenen Branchen. Ob
                Café-Betreiberin oder Produkt-Entwickler, Software-Spezialist
                oder Traurednerin bis hin zum Konflikt-Coach ist alles
                vertreten. Nur du fehlst noch!
              </p>
            </div>
          </div>
          <Button>Alle FAQs</Button>
        </section>
        <section className="relative bg-sand p-8">
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
              <ul className="list-disc">
                <li>
                  du eine Idee hast, für die du brennst oder auf der Suche nach
                  einer Idee bist
                </li>
                <li>du eigenverantwortlich deine Idee vorantreibst</li>
                <li>
                  du die Innovations- & Gründungskultur in Esslingen mit deiner
                  Idee bereichern möchtest
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
              <ul className="list-disc">
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
              layout="responsive"
              width={600}
              height={200}
            />
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Ueber;
