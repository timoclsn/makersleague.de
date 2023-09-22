import type { GetStaticProps } from 'next';
import { Page } from '../components/Page';
import { getMemberInfos, WebsiteMember } from 'lib/easyverein';
import { Members } from 'components/Members';

interface Props {
  members: WebsiteMember[];
}

export default function MembersPage({ members }: Props) {
  return (
    <Page
      title="Unsere Mitglieder"
      description="Übersicht über alle Makers League Mitglieder"
      slug="mitglieder"
    >
      <section>
        <h1 className="mb-6 text-xl font-bold md:text-5xl">
          Unsere Mitglieder
        </h1>
        <p className="mb-16 text-base opacity-60 md:text-2xl">
          Einige Superheld*innen der Makers League
        </p>
        <Members members={members} />
      </section>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const members = await getMemberInfos();
  return {
    props: {
      members,
    },
    revalidate: 60,
  };
};
