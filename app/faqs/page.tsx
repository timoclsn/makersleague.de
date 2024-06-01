import { ContactSection } from "components/ContactSection";
import { Faqs } from "components/Faqs";
import { Page } from "components/Page";
import { getAllFaqs } from "lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Makers League FAQs",
};

const FaqPage = async () => {
  const faqs = await getAllFaqs();
  return (
    <Page>
      <section>
        <h1 className="mb-6 text-xl font-bold md:text-5xl">FAQs</h1>
        <p className="mb-16 text-base opacity-60 md:text-2xl">
          Häufig gestellte Fragen und deren Antworten
        </p>
        <Faqs faqs={faqs} />
      </section>
      <ContactSection />
    </Page>
  );
};

export default FaqPage;
