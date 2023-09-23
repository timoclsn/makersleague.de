import Link from "next/link";

import { Faq } from "contentlayer/generated";
import { Arrow } from "icons";
import { Button } from "./Button";
import { Faqs } from "./Faqs";

interface Props {
  faqs: Faq[];
}

export const FaqsSection = ({ faqs }: Props) => {
  return (
    <section id="faqs">
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">FAQs</h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Häufige Fragen und deren Antworten
        </p>
        <Faqs faqs={faqs} />
      </div>
      <Link href="/faqs" passHref legacyBehavior>
        <Button as="a">
          <Arrow className="text-2xl" />
          Alle FAQs
        </Button>
      </Link>
    </section>
  );
};
