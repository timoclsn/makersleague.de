import { Check, Clipboard, DocumentInfo, Question } from "icons";
import { ApplyButton } from "./ApplyButton";
import { Button } from "./Button";

export const ButtonSection = () => {
  return (
    <section className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-9">
      <ApplyButton />
      <Button href="#faqs" variant="link">
        <Question className="text-2xl" />
        FAQs
      </Button>
      <Button href="#fit" variant="link">
        <Check className="text-2xl" />
        Passe ich zur ML?
      </Button>
      <Button href="/docs/Makers_League_eV_Satzung.pdf" variant="link">
        <Clipboard className="text-2xl" />
        Satzung
      </Button>
      <Button href="/docs/Makers_League_eV_Beitragsordnung.pdf" variant="link">
        <DocumentInfo className="text-2xl" />
        Beitragsordnung
      </Button>
    </section>
  );
};
