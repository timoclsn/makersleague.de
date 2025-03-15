import { BoardMembersSection } from "@/components/BoardMembersSection";
import { PageLayout } from "@/components/layouts/PageLayout";
import { getFaqsByTags } from "@/lib/content";
import { ApplySection } from "components/ApplySection";
import { BlogSection } from "components/BlogSection";
import { ContactSection } from "components/ContactSection";
import { EventsSection } from "components/EventsSection";
import { FaqsSection } from "components/FaqsSection";
import { FitSection } from "components/FitSection";
import { InstagramSection } from "components/InstagramSection";
import { PageContent } from "components/layouts/PageContent";
import { MembersSection } from "components/MembersSection";
import { TestimonialsSection } from "components/TestimonialsSection";
import { ValuesSection } from "components/ValuesSection";
import Image from "next/image";
import { HeroButtons } from "./HeroButtons";
import membersImg from "./mitglieder.png";
import { MakersInnSection } from "components/MakersInnSection";

const HomePage = async () => {
  const faqs = await getFaqsByTags(["general"]);
  return (
    <PageLayout>
      <div className="mb-20 flex min-h-[calc(100svh-100px)] flex-1 flex-col md:mb-32 md:min-h-[calc(100svh-188px)] lg:min-h-[calc(100svh-209px)]">
        <div className="mx-auto max-w-screen-xl">
          <h1 className="mb-4 text-base opacity-80 md:text-2xl">
            Makers League e. V.
          </h1>
          <h2 className="mb-4 text-xl font-bold leading-tight md:text-5xl md:leading-tight">
            Die Gemeinschaft für Macher*innen in Esslingen.
          </h2>
          <p className="mb-14 text-lg leading-tight opacity-80 md:text-3xl md:leading-tight">
            Hier bekommen Macher*innen Mut & bringen ihre Ideen gemeinsam voran.
          </p>
          <HeroButtons />
        </div>

        <div className="relative -mx-4 min-h-[200px] flex-1 overflow-hidden border-b-4 md:-mx-10 md:min-h-[500px]">
          <div className="absolute bottom-0 left-0 w-[100px] md:w-[200px]">
            <Image
              src="/assets/doodle-selfie.svg"
              alt="Doodle Selfie"
              width={200}
              height={336}
              priority
            />
          </div>
          <div className="absolute bottom-0 left-1/2 -mb-12 -ml-16 w-[160px] md:-mb-24 md:-ml-32 md:w-[300px]">
            <Image
              src="/assets/doodle-loving.svg"
              alt="Doodle Loving"
              width={300}
              height={336}
              priority
            />
          </div>
          <div className="absolute bottom-8 right-0 -mr-24 w-[260px] md:-mr-64 md:w-[600px]">
            <Image
              src="/assets/doodle-coffee.svg"
              alt="Doodle Coffee"
              width={500}
              height={336}
              priority
            />
          </div>
        </div>
      </div>
      <PageContent>
        <section id="about-us" className="scroll-mt-10">
          <h1 className="mb-6 text-xl font-bold md:text-5xl">Über uns</h1>
          <div className="mb-14 flex flex-col gap-12 md:flex-row">
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
            </p>
          </div>
          <Image
            src={membersImg}
            alt="Makers League Mitglieder Gruppenbild"
            className="border-4 border-dashed border-dark p-4"
          />
        </section>
        <MembersSection />
        <MakersInnSection />
        <EventsSection />
        <ValuesSection />
        <BoardMembersSection />
        <FitSection />
        <TestimonialsSection />
        <ApplySection />
        <ContactSection
          name="Nina Kuch"
          email="nina@makersleague.de"
          subtitle="2. Vorstandsvorsitzende"
        />
        <InstagramSection />
        <BlogSection />
        <FaqsSection faqs={faqs} />
      </PageContent>
    </PageLayout>
  );
};

export default HomePage;
