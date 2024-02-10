import { Members } from "components/Members";
import { Page } from "components/Page";
import { getMemberInfosCached, getMembersCountCached } from "lib/easyverein";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitglieder",
  description: "Makers League Mitglieder",
};

const MembersPage = async () => {
  const members = await getMemberInfosCached();
  const membersCount = await getMembersCountCached();
  return (
    <Page>
      <section>
        <h1 className="mb-6 text-xl font-bold md:text-5xl">
          Unsere Mitglieder
        </h1>
        <p className="mb-16 text-base opacity-60 md:text-2xl">
          Einige der {membersCount} Superheld*innen der Makers League
        </p>
        <Members members={members} />
      </section>
    </Page>
  );
};

export default MembersPage;
