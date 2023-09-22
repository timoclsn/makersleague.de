import type { GetStaticProps } from 'next';

import { Page } from '../components/Page';
import { allFaqs, Faq } from 'contentlayer/generated';
import { Faqs } from 'components/Faqs';
import { Button } from 'components/Button';
import { Arrow } from 'icons';

interface Props {
  faqs: Faq[];
}

export default function FaqsPage({ faqs }: Props) {
  return (
    <Page
      title="FAQs"
      description="Häufig gestellte Fragen und deren Antworten"
      slug="faqs"
    >
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
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const faqs = allFaqs.sort((a, b) => a.question.localeCompare(b.question));
  return { props: { faqs } };
};
