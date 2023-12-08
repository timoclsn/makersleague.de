import { FaqsSection } from "components/FaqsSection";
import { FitSection } from "components/FitSection";
import { MembersSection } from "components/MembersSection";
import { Page } from "components/Page";
import { ValuesSection } from "components/ValuesSection";
import Image from "next/image";

const HomePage = () => (
  <>
    <div className="mb-20 flex min-h-[calc(100vh-116px)] flex-1  flex-col md:mb-32 lg:min-h-[calc(100vh-250px)]">
      <div className="mx-auto max-w-screen-xl space-y-4">
        <h1 className="text-base opacity-80 md:text-2xl">
          Makers League e. V.
        </h1>
        <h2 className="mb-8 text-xl font-bold leading-tight md:text-5xl md:leading-tight">
          Die Gemeinschaft für Macher*innen in Esslingen.
        </h2>
        <p className="text-lg leading-tight opacity-80 md:text-3xl md:leading-tight">
          Hier bekommen Macher*innen Mut & bringen ihre Ideen gemeinsam voran.
        </p>
      </div>

      <div className="relative -mx-4 -mb-4 min-h-[200px] flex-1 overflow-hidden md:-mx-10 md:-mb-10 md:min-h-[500px]">
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
    <Page>
      <section>
        <h1 className="mb-6 text-xl font-bold md:text-5xl">Über uns</h1>
        <div className="mb-11 flex flex-col space-x-0 space-y-12 md:flex-row md:space-x-12 md:space-y-0">
          <p>
            Wir sind Veränderer, Voranbringerinnen, Erfinder, Umkremplerinnen –
            wir sind Macher. Die Makers League ist ein Verein, in dem sich
            Gründer*innen und Kleinstunternehmer, Firmen, Betriebe,
            Tüftler*innen und Pioniere zusammentun. Uns alle verbindet, dass wir
            in und um Esslingen am Neckar unternehmerisch tätig sind oder sein
            möchten und dass wir uns dabei als Netzwerk gegenseitig
            unterstützen.
            <br />
            <br />
            Mit Know-How, Kontakten, Motivation, gemeinsamen Veranstaltungen und
            vielem mehr. Dabeisein können alle, die selbst Macher sind oder die
            Arbeit der Makers League fördern wollen. Wir setzen uns für ein
            modernes, innovatives Esslingen ein, in dem kreativer
            Unternehmergeist entstehen und wachsen kann.
          </p>
        </div>
      </section>
      <MembersSection />
      <ValuesSection />
      <FitSection />
      <FaqsSection />
    </Page>
  </>
);

export default HomePage;
