import Link from 'next/link';

import { Check, DocumentInfo, HeartPlus, Question, Clipboard } from 'icons';
import { Button } from './Button';

export function ButtonSection() {
  return (
    <section className="spaxe-x-0 flex flex-col items-start space-y-6 md:flex-row md:items-center md:space-y-0 md:space-x-9">
      <Button as="a" href="https://easyverein.com/public/ML/applicationform/">
        <HeartPlus className="text-2xl" />
        Mitglied werden
      </Button>
      <Link href="#faqs" passHref legacyBehavior>
        <Button as="a" variant="link">
          <Question className="text-2xl" />
          FAQs
        </Button>
      </Link>
      <Link href="#fit" passHref legacyBehavior>
        <Button as="a" variant="link">
          <Check className="text-2xl" />
          Passe ich zur ML?
        </Button>
      </Link>
      <Link href="/docs/Makers_League_eV_Satzung.pdf" passHref legacyBehavior>
        <Button as="a" variant="link">
          <Clipboard className="text-2xl" />
          Satzung
        </Button>
      </Link>
      <Link href="/docs/Makers_League_eV_Beitragsordnung.pdf" passHref legacyBehavior>
        <Button as="a" variant="link">
          <DocumentInfo className="text-2xl" />
          Beitragsordnung
        </Button>
      </Link>
    </section>
  );
}
