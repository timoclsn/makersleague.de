import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ButtonSection } from 'components/ButtonSection';
import { FaqsSection } from 'components/FaqsSection';
import { FitSection } from 'components/FitSection';
import { MembersSection } from 'components/MembersSection';
import { ValuesSection } from 'components/ValuesSection';
import { allFaqs, Faq } from 'contentlayer/generated';
import { Arrow } from 'icons';
import { getMemberInfos, WebsiteMember } from 'lib/easyverein';
import { Page } from '../components/Page';

interface Props {
  members: WebsiteMember[];
  faqs: Faq[];
}

export default function Ueber({ members, faqs }: Props) {
  return (
    <Page
      title="Über uns"
      description="Über den Verein Makers League"
      slug="ueber"
    >
      <section>
        <h1 className="mb-6 text-xl font-bold md:text-5xl">Über uns</h1>
        <div className="mb-11 flex flex-col space-y-12 space-x-0 md:flex-row md:space-x-12 md:space-y-0">
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
            <br />
            <br />
            Die Superkräfte, die uns dabei antreiben, heißen Mut und
            Hilfsbereitschaft, Optimismus und Vertrauen, in uns, in euch und in
            die ganze Region.
          </p>
          <div className="relative flex flex-col overflow-hidden bg-blue p-6">
            <h2 className="mb-4 text-2xl font-bold">Unsere Werte</h2>
            <h3 className="mb-2 font-bold">
              OMG – Offenheit, Machen & Gemeinschaft
            </h3>
            <p>
              Das Zusammenleben in unserer Community basiert auf drei
              Kernwerten. Bei uns steht die Abkürzung OMG nicht für „Oh my God“,
              sondern für Offenheit, Machen & Gemeinschaft. Mehr Infos zu
              unseren Werten findest du hier.
            </p>
            <div className="mt-20 flex flex-1 flex-col-reverse items-start">
              <Link
                href="#values"
                className="flex items-center justify-center gap-1 font-bold text-blue-accent hover:opacity-80"
              >
                <span>
                  <Arrow className="text-2xl" />
                  mehr
                </span>
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 -mb-10 -mr-6 w-[150px]">
              <Image
                src="/assets/doodle-loving-blue.svg"
                alt="Doodle Loving"
                width={300}
                height={336}
              />
            </div>
          </div>
        </div>
        <ButtonSection />
      </section>
      <MembersSection members={members} />
      <ValuesSection />
      <FaqsSection faqs={faqs} />
      <FitSection />
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allMembers = await getMemberInfos();
  const members = allMembers.sort(() => Math.random() - 0.5).slice(0, 5);
  const faqs = allFaqs.filter((faq) => faq.preview);
  return {
    props: {
      members,
      faqs,
    },
  };
};
