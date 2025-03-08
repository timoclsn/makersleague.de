import { PageLayout } from "@/components/layouts/PageLayout";
import { ApplyForm } from "components/ApplyForm";
import { ContactSection } from "components/ContactSection";
import { FaqsSection } from "components/FaqsSection";
import { PageContent } from "components/layouts/PageContent";

const ApplyPage = () => {
  return (
    <PageLayout>
      <PageContent>
        <section>
          <h1 className="mb-4 text-base opacity-80 md:text-2xl">Bewerbung</h1>
          <h2 className="mb-11 text-xl font-bold leading-tight md:text-5xl md:leading-tight">
            Deine Bewerbung für die Mitgliedschaft in der Makers League:
          </h2>
          <ApplyForm />
        </section>
        <FaqsSection />
        <ContactSection
          name="Nina Kuch"
          email="nina@makersleague.de"
          subtitle="2. Vorstandsvorsitzende"
        />
      </PageContent>
    </PageLayout>
  );
};

export default ApplyPage;
