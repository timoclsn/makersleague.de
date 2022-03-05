import { GetStaticProps } from 'next';

import { Button } from 'components/Button';
import { ButtonSection } from 'components/ButtonSection';
import { FitSection } from 'components/FitSection';
import { Page } from 'components/Page';
import { ValuesSection } from 'components/ValuesSection';
import { allFaqs, Faq } from 'contentlayer/generated';
import { HeartPlus } from 'icons';
import { FaqsSection } from 'components/FaqsSection';

interface Props {
  faqs: Faq[];
}

export default function Signup({ faqs }: Props) {
  return (
    <Page>
      <section className="space-y-4">
        <h1 className="text-base opacity-80 md:text-2xl">Mitglied werden</h1>
        <h2 className="text-xl font-bold leading-tight md:text-5xl md:leading-tight">
          Du möchtest Teil unseres Macher*innen Netzwerks werden? Dann findest
          du hier alle wichtigen Infos und den Link zur Anmedung!
        </h2>
      </section>
      <ButtonSection />
      <FitSection />
      <FaqsSection faqs={faqs} />
      <ValuesSection />
      <section className="space-y-12">
        <h2 className="text-xl font-bold leading-tight md:text-5xl md:leading-tight">
          Du möchtest Teil unseres Netzwerks werden um mit spannenden
          Superhelden wie Alex Ideen voranbringen zu können?
        </h2>
        <Button
          as="a"
          color="pink"
          href="https://easyverein.com/public/ML/applicationform/"
        >
          <HeartPlus className="text-2xl" />
          Mitglied werden
        </Button>
      </section>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const faqs = allFaqs;
  return { props: { faqs } };
};
