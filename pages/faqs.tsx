import type { GetStaticProps } from 'next';

import { Page } from '../components/Page';
import { allFaqs, Faq } from 'contentlayer/generated';
import { Faqs } from 'components/Faqs';

interface Props {
  faqs: Faq[];
}

export default function FaqsPage({ faqs }: Props) {
  return (
    <Page>
      <section>
        <h1 className="mb-6 text-xl font-bold md:text-5xl">FAQs</h1>
        <p className="mb-16 text-base opacity-60 md:text-2xl">
          Häufig gestellte Fragen und deren Antworten
        </p>
        <Faqs faqs={faqs} />
      </section>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const faqs = allFaqs;
  return { props: { faqs } };
};
