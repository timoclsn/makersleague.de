import { ContactSectionCity } from "@/components/ContactSectionCity";
import { FaqsSection } from "@/components/FaqsSection";
import { Header } from "@/components/Header";
import { Logo } from "@/components/icons/Logo";
import { PageContent } from "@/components/layouts/PageContent";
import { PageLayoutFull } from "@/components/layouts/PageLayoutFull";
import { Map } from "@/components/Map";
import { getFaqsByTags } from "@/lib/content";
import {
  Calendar,
  Focus,
  Layout,
  MapPin,
  Phone,
  Terminal,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Gallery } from "./Gallery";
import linuxCafeLogo from "./linux-cafe.png";
import esLogo from "./logo-es.svg";

const MakersInnPage = async () => {
  const faqs = await getFaqsByTags(["makers-inn"]);

  return (
    <PageLayoutFull>
      <section className="relative h-screen w-full">
        <Image
          src="https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdUppCGDzdATVG7RSsNX6LCntb01OzKPFWYQmq"
          alt="Makers Inn"
          fill
          className="object-cover"
        />
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center px-2">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-dark bg-white px-2 text-3xl font-bold sm:text-4xl lg:text-5xl xl:text-6xl">
              Das Makers Inn
            </h1>
            <h2 className="text-dark bg-white px-2 text-lg font-bold sm:text-xl lg:text-2xl xl:text-3xl">
              Die Zentrale Anlaufstelle für Menschen mit Ideen in Esslingen
            </h2>
            <div className="bg-white px-2">
              <p>Ein Projekt der</p>
              <Image src={esLogo} alt="Logo der Stadt Esslingen" />
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full p-4 md:p-10">
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
              <div className="bg-blue relative flex flex-none flex-col overflow-hidden p-6 pb-20">
                <h2 className="mb-4 text-2xl font-bold">Was passiert hier?</h2>
                <ul className="list-inside list-disc">
                  <li>Austausch & Workshops</li>
                  <li>Wissenstransfer</li>
                  <li>Gründungsspezifische Events</li>
                  <li>Gemeinsames Arbeiten</li>
                  <li>Treffpunkt für Macher:innen</li>
                  <li>Ideen werden sichtbar gemacht</li>
                </ul>
                <div className="absolute right-0 bottom-0 -mr-6 -mb-10 w-[150px]">
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
          <section id="initiatives" className="bg-blue relative p-8">
            <h2 className="mb-2 text-base font-bold md:text-2xl">
              Für wen ist es?
            </h2>
            <p className="mb-10 text-base opacity-60 md:text-2xl">
              Gemeinsam Ideen entwickeln und umsetzen
            </p>
            <p className="opacity-80">
              Für Makers League Mitglieder:innen täglicher Zugang von
              08:00-20:00 Uhr um an ihren Ideen zu arbeiten und gemeinsam im
              Austausch mit anderen Macher:innen ihre Gründungsvorhaben
              voranzutreiben und voneinander lernen.
            </p>
            <br />
            <p className="opacity-80">
              Monatlich organisiert die Makers League dafür verschiedene{" "}
              <Link href="/events" className="underline">
                Events
              </Link>
              .
            </p>

            <div className="mt-10">
              <h3 className="mb-4 font-bold">
                Initiativen, die hier Zuhause sind
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <Link
                  href="/events"
                  className="block bg-white p-4 transition-transform hover:scale-105"
                >
                  <h4 className="mb-4 text-center font-bold">ML Events</h4>
                  <div className="flex flex-col items-center gap-4">
                    <Logo className="text-pink h-16 w-16" />
                    <p className="text-dark flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4" />
                      Zum Eventkalender
                    </p>
                  </div>
                </Link>
                <Link
                  href="https://reparaturcafe-esslingen.de/linuxcafe/"
                  target="_blank"
                  className="block bg-white p-4 transition-transform hover:scale-105"
                >
                  <h4 className="mb-4 text-center font-bold">Linux Cafe</h4>
                  <div className="flex flex-col items-center gap-4">
                    <Image
                      src={linuxCafeLogo}
                      alt="Linux Cafe Logo"
                      className="h-16 w-auto object-contain"
                    />
                    <p className="text-dark flex items-center gap-2 text-sm font-medium">
                      <Terminal className="h-4 w-4" />
                      Zur Website
                    </p>
                  </div>
                </Link>
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
              <div className="border border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="text-blue-accent h-5 w-5" />
                  <h3 className="font-bold">Mitten in der Stadt</h3>
                </div>
                <p className="opacity-80">
                  Zentral in der Esslinger Altstadt gelegen, leicht erreichbar
                  und gut vernetzt.
                </p>
              </div>

              <div className="border border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Users className="text-blue-accent h-5 w-5" />
                  <h3 className="font-bold">280qm Open Space</h3>
                </div>
                <p className="opacity-80">
                  Großzügiger Raum für Kreativität, Zusammenarbeit und
                  Entwicklung neuer Ideen.
                </p>
              </div>

              <div className="border border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="text-blue-accent h-5 w-5" />
                  <h3 className="font-bold">Macher:innen Schaufenster</h3>
                </div>
                <p className="opacity-80">
                  Präsentiere deine Ideen und Projekte der Öffentlichkeit und
                  gewinne neue Unterstützer.
                </p>
              </div>

              <div className="border border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Layout className="text-blue-accent h-5 w-5" />
                  <h3 className="font-bold">Modulare Arbeitsinseln</h3>
                </div>
                <p className="opacity-80">
                  Flexible Arbeitsbereiche, die sich an deine Bedürfnisse
                  anpassen lassen.
                </p>
              </div>

              <div className="border border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Focus className="text-blue-accent h-5 w-5" />
                  <h3 className="font-bold">Fokuszone</h3>
                </div>
                <p className="opacity-80">
                  Bereiche für konzentriertes Arbeiten, wenn du Ruhe für deine
                  Projekte brauchst.
                </p>
              </div>

              <div className="border border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Phone className="text-blue-accent h-5 w-5" />
                  <h3 className="font-bold">Telefonbox</h3>
                </div>
                <p className="opacity-80">
                  Eine geschützte Telefonbox für wichtige Gespräche und
                  Videocalls in ruhiger Atmosphäre.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold md:text-2xl">Adresse</h2>
            <p className="mb-10 text-base opacity-60 md:text-2xl">
              Hier findest du uns
            </p>
            <div className="flex flex-col gap-8">
              <Map />
              <div className="flex justify-end">
                <address className="text-lg not-italic">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-blue-accent h-5 w-5" />
                    <div>
                      <p>Küferstr. 46</p>
                      <p>73728 Esslingen</p>
                    </div>
                  </div>
                </address>
              </div>
            </div>
          </section>

          <ContactSectionCity />
          <FaqsSection faqs={faqs} />
        </PageContent>
      </div>
    </PageLayoutFull>
  );
};

export default MakersInnPage;
