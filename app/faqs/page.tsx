import { Button } from "components/Button";
import { Faqs } from "components/Faqs";
import { allFaqs } from "contentlayer/generated";
import { Arrow } from "icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Makers League FAQs",
};

const FaqPage = () => {
  const faqs = allFaqs.sort((a, b) => a.question.localeCompare(b.question));
  return (
    <>
      <section>
        <h1 className="mb-6 text-xl font-bold md:text-5xl">FAQs</h1>
        <p className="mb-16 text-base opacity-60 md:text-2xl">
          Häufig gestellte Fragen und deren Antworten
        </p>
        <Faqs faqs={faqs} />
      </section>
      <section className="space-y-12">
        <h2 className="text-xl font-bold leading-tight md:text-5xl md:leading-tight">
          Du hast weitere Fragen? Dann schreib uns gerne eine E-Mail.
        </h2>
        <Button as="a" color="pink" href="mailto:hello@makersleague.de">
          <Arrow className="text-2xl" />
          E-Mail schreiben
        </Button>
      </section>
    </>
  );
};

export default FaqPage;
