import { Header } from "@/components/Header";
import { PageContent } from "@/components/layouts/PageContent";
import { PageLayoutFull } from "@/components/layouts/PageLayoutFull";
import Image from "next/image";
import esLogo from "./logo-es.svg";
import makersInnImg from "./makers-inn.jpeg";
import { Gallery } from "./Gallery";

const MakersInnPage = () => {
  return (
    <PageLayoutFull>
      <section className="relative h-screen w-full">
        <Image
          src={makersInnImg}
          alt="Makers Inn"
          fill
          className="object-cover"
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="bg-white text-6xl font-bold text-dark">
              Das Makers-Inn
            </h1>
            <h2 className="bg-white text-3xl font-bold text-dark">
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
            <p className="mb-10 text-base opacity-60 md:text-2xl">Subline</p>
            <p className="opacity-80">
              Für Makers League Mitglieder täglicher Zugang von 08:00-20:00 Uhr
              um an ihren Ideen zu arbeiten und gemeinsam im Austausch mit
              anderen Macher:innen ihre Gründungsvorhaben voranzutreiben und
              voneinander lernen.{" "}
            </p>
            <br />
            <p className="opacity-80">
              Monatlich organisiert die Makers League dafür verschiedene Events
              (Link zu Eventkalender).
            </p>
          </section>
          <section>Was macht das Makers Inn besonders?</section>
          <section>Ansprechpartnerin</section>
          <section>FAQ Section</section>
        </PageContent>
      </div>
    </PageLayoutFull>
  );
};

export default MakersInnPage;
