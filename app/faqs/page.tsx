import { PageLayout } from "@/components/layouts/PageLayout";
import { ContactSectionClub } from "components/ContactSectionClub";
import { Faqs } from "components/Faqs";
import { PageContent } from "components/layouts/PageContent";
import { getAllFaqs } from "lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Makers League FAQs",
};

const FaqPage = async () => {
  const faqs = await getAllFaqs();
  return (
    <PageLayout>
      <PageContent>
        <section>
          <h1 className="mb-6 text-xl font-bold md:text-5xl">FAQs</h1>
          <p className="mb-16 text-base opacity-60 md:text-2xl">
            Häufig gestellte Fragen und deren Antworten
          </p>
          <Faqs faqs={faqs} />
        </section>
        <ContactSectionClub />
      </PageContent>
    </PageLayout>
  );
};

export default FaqPage;
