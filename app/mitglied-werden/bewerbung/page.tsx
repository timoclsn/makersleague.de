import { ApplyForm } from "components/ApplyForm";
import { ContactSection } from "components/ContactSection";
import { FaqsSection } from "components/FaqsSection";
import { Page } from "components/Page";

const ApplyPage = () => {
  return (
    <Page>
      <section>
        <h1 className="mb-4 text-base opacity-80 md:text-2xl">Bewerbung</h1>
        <h2 className="mb-11 text-xl font-bold leading-tight md:text-5xl md:leading-tight">
          Deine Bewerbung für die Mitgliedschaft in der Makers League:
        </h2>
        <ApplyForm />
      </section>
      <FaqsSection />
      <ContactSection />
    </Page>
  );
};

export default ApplyPage;
