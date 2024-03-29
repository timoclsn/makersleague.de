import { Arrow } from "components/icons";
import { getPreviewFaqs } from "lib/content";
import { Button } from "./Button";
import { Faqs } from "./Faqs";

export const FaqsSection = async () => {
  const faqs = await getPreviewFaqs();

  return (
    <section id="faqs">
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">FAQs</h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Häufige Fragen und deren Antworten
        </p>
        <Faqs faqs={faqs} />
      </div>
      <Button href="/faqs">
        <Arrow className="text-2xl" />
        Alle FAQs
      </Button>
    </section>
  );
};
