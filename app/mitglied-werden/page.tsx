import { BoardMembersSection } from "@/components/BoardMembersSection";
import { PageLayout } from "@/components/layouts/PageLayout";
import { getFaqsByTags } from "@/lib/content";
import { ApplySection } from "components/ApplySection";
import { ContactSectionClub } from "components/ContactSectionClub";
import { FaqsSection } from "components/FaqsSection";
import { FitSection } from "components/FitSection";
import { PageContent } from "components/layouts/PageContent";
import { ValuesSection } from "components/ValuesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitglied werden",
  description: "Makers League Mitglied werden",
};

const BecomeMemberPage = async () => {
  const faqs = await getFaqsByTags(["general"]);
  return (
    <PageLayout>
      <PageContent>
        <section>
          <h1 className="mb-4 text-base opacity-80 md:text-2xl">
            Mitglied werden
          </h1>
          <h2 className="mb-11 text-xl leading-tight font-bold md:text-5xl md:leading-tight">
            Du möchtest Teil unseres Macher*innen Netzwerks werden? Dann findest
            du hier alle wichtigen Infos!
          </h2>
        </section>
        <ApplySection />
        <FitSection />
        <ValuesSection />
        <FaqsSection faqs={faqs} />
        <ContactSectionClub />
        <BoardMembersSection />
      </PageContent>
    </PageLayout>
  );
};

export default BecomeMemberPage;
