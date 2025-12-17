import { PageLayout } from "@/components/layouts/PageLayout";
import { getFaqsByTags } from "@/lib/content";
import { ApplyForm } from "components/ApplyForm";
import { ContactSectionClub } from "components/ContactSectionClub";
import { FaqsSection } from "components/FaqsSection";
import { PageContent } from "components/layouts/PageContent";

const ApplyPage = async () => {
  const faqs = await getFaqsByTags(["general"]);
  return (
    <PageLayout>
      <PageContent>
        <section>
          <h1 className="mb-4 text-base opacity-80 md:text-2xl">Bewerbung</h1>
          <h2 className="mb-11 text-xl leading-tight font-bold md:text-5xl md:leading-tight">
            Deine Bewerbung für die Mitgliedschaft in der Makers League:
          </h2>
          <ApplyForm />
        </section>
        <FaqsSection faqs={faqs} />
        <ContactSectionClub />
      </PageContent>
    </PageLayout>
  );
};

export default ApplyPage;
