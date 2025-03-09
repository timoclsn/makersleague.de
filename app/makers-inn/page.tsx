import { Button } from "@/components/Button";
import { ContactSection } from "@/components/ContactSection";
import { FaqsSection } from "@/components/FaqsSection";
import { Header } from "@/components/Header";
import { PageContent } from "@/components/layouts/PageContent";
import { PageLayoutFull } from "@/components/layouts/PageLayoutFull";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { Gallery } from "./Gallery";
import esLogo from "./logo-es.svg";
// import makersInnImg from "./makers-inn.jpeg";

const MakersInnPage = () => {
  return (
    <PageLayoutFull>
      <section className="relative h-screen w-full">
        {/* <Image */}
        {/*   src={makersInnImg} */}
        {/*   alt="Makers Inn" */}
        {/*   fill */}
        {/*   className="object-cover" */}
        {/* /> */}
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center px-2">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="bg-white px-2 text-3xl font-bold text-dark sm:text-4xl lg:text-5xl xl:text-6xl">
              Das Makers Inn
            </h1>
            <h2 className="bg-white px-2 text-lg font-bold text-dark sm:text-xl lg:text-2xl xl:text-3xl">
              Die Zentrale Anlaufstelle für Menschen mit Ideen in Esslingen
            </h2>
            <div className="bg-white px-2">
              <p>Ein Projekt der</p>
              <Image src={esLogo} alt="Logo der Stadt Esslingen" />
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 w-full p-4 md:p-10">
          <Header variant="light" />
        </div>
      </section>
      <div className="p-4 md:p-10">
        <PageContent>
          <section>
            <h1 className="mb-6 text-xl font-bold md:text-5xl">Info</h1>
            <div className="mb-11 flex flex-col gap-12 md:flex-row">
              <p>
                Im Makers Inn entstehen Ideen für die Gründungen von morgen. Die
                Stadt Esslingen stellt dafür den Raum inmitten der Esslinger
                Altstadt zur Verfügung um die Vernetzung lokaler Gründer:innen
                und Macher:innen zu verbessern der neben den Makers League
                Mitgliedern auch Bürger:innen und Initiativen zur Verfügung
                steht, die mit ihrem Angebot zur Gründungs- oder
                Innovationsförderung beitragen.
              </p>
              <div className="relative flex flex-none flex-col overflow-hidden bg-blue p-6 pb-20">
                <h2 className="mb-4 text-2xl font-bold">Was passiert hier?</h2>
                <ul className="list-inside list-disc">
                  <li>Austausch & Workshops</li>
                  <li>Wissenstransfer</li>
                  <li>Gründungsspezifische Events</li>
                  <li>Gemeinsames Arbeiten</li>
                  <li>Treffpunkt für Macher:innen</li>
                  <li>Ideen werden sichtbar gemacht</li>
                </ul>
                <div className="absolute bottom-0 right-0 -mb-10 -mr-6 w-[150px]">
                  <Image
                    src="/assets/doodle-loving-blue.svg"
                    alt="Doodle Loving"
                    width={300}
                    height={336}
                  />
                </div>
              </div>
            </div>
          </section>
          <section>
            <h1 className="mb-6 text-xl font-bold md:text-5xl">Galerie</h1>
            <Gallery />
          </section>
          <section className="relative bg-blue p-8">
            <h2 className="mb-2 text-base font-bold md:text-2xl">
              Für wen ist es?
            </h2>
            <p className="mb-10 text-base opacity-60 md:text-2xl">
              Gemeinsam Ideen entwickeln und umsetzen
            </p>
            <p className="opacity-80">
              Für Makers League Mitglieder täglicher Zugang von 08:00-20:00 Uhr
              um an ihren Ideen zu arbeiten und gemeinsam im Austausch mit
              anderen Macher:innen ihre Gründungsvorhaben voranzutreiben und
              voneinander lernen.
            </p>
            <br />
            <p className="opacity-80">
              Monatlich organisiert die Makers League dafür verschiedene Events.
            </p>

            <div className="mt-10">
              <h3 className="mb-4 font-bold">
                Initiativen, die hier Zuhause sind
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-md bg-white p-4 shadow-sm">
                  <h4 className="mb-2 font-bold">ML Events</h4>
                  <Button
                    color="dark"
                    variant="outline"
                    size="small"
                    href="/events"
                  >
                    <Calendar className="text-xl" />
                    Zum Eventkalender
                  </Button>
                </div>
                <div className="rounded-md bg-white p-4 shadow-sm">
                  <h4 className="mb-2 font-bold">Linux Cafe</h4>
                  <Button
                    color="dark"
                    variant="outline"
                    size="small"
                    href="https://reparaturcafe-esslingen.de/linuxcafe/"
                    target="_blank"
                  >
                    Zur Website
                  </Button>
                </div>
                <div className="rounded-md bg-white p-4 shadow-sm">
                  <h4 className="mb-2 font-bold">Freifunk Esslingen e.V.</h4>
                  <Button
                    color="dark"
                    variant="outline"
                    size="small"
                    href="https://freifunk-esslingen.de/"
                    target="_blank"
                  >
                    Zur Website
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold md:text-2xl">
              Was macht das Makers Inn besonders?
            </h2>
            <p className="mb-10 text-base opacity-60 md:text-2xl">
              Ein einzigartiger Ort für Macher:innen
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-md border border-gray-200 p-6">
                <h3 className="mb-2 font-bold">Mitten in der Stadt</h3>
                <p className="opacity-80">
                  Zentral in der Esslinger Altstadt gelegen, leicht erreichbar
                  und gut vernetzt.
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-6">
                <h3 className="mb-2 font-bold">280qm Open Space</h3>
                <p className="opacity-80">
                  Großzügiger Raum für Kreativität, Zusammenarbeit und
                  Entwicklung neuer Ideen.
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-6">
                <h3 className="mb-2 font-bold">Macher:innen Schaufenster</h3>
                <p className="opacity-80">
                  Präsentiere deine Ideen und Projekte der Öffentlichkeit und
                  gewinne neue Unterstützer.
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-6">
                <h3 className="mb-2 font-bold">Modulare Arbeitsinseln</h3>
                <p className="opacity-80">
                  Flexible Arbeitsbereiche, die sich an deine Bedürfnisse
                  anpassen lassen.
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-6">
                <h3 className="mb-2 font-bold">Fokuszone</h3>
                <p className="opacity-80">
                  Bereiche für konzentriertes Arbeiten, wenn du Ruhe für deine
                  Projekte brauchst.
                </p>
              </div>
            </div>
          </section>

          <ContactSection
            name="Daniela Gorka"
            email="daniala@makersleague.de"
            subtitle="Innovationsmanagerin Stadt Esslingen"
          />
          <FaqsSection />
        </PageContent>
      </div>
    </PageLayoutFull>
  );
};

export default MakersInnPage;
