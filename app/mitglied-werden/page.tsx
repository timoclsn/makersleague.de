import { Button } from 'components/Button';
import { ButtonSection } from 'components/ButtonSection';
import { FaqsSection } from 'components/FaqsSection';
import { FitSection } from 'components/FitSection';
import { ValuesSection } from 'components/ValuesSection';
import { allFaqs } from 'contentlayer/generated';
import { HeartPlus } from 'icons';

const MitgliedWerdenPage = () => {
  const faqs = allFaqs.slice(0, 4);

  return (
    <>
      <section>
        <h1 className="mb-4 text-base opacity-80 md:text-2xl">
          Mitglied werden
        </h1>
        <h2 className="mb-11 text-xl font-bold leading-tight md:text-5xl md:leading-tight">
          Du möchtest Teil unseres Macher*innen Netzwerks werden? Dann findest
          du hier alle wichtigen Infos und den Link zur Bewerbung!
        </h2>
        <ButtonSection />
      </section>
      <FitSection />
      <FaqsSection faqs={faqs} />
      <ValuesSection />
      <section className="space-y-12">
        <h2 className="text-xl font-bold leading-tight md:text-5xl md:leading-tight">
          Klingt gut? Dann fülle unsere Bewerbung aus! Anschließend bekommst du
          weitere Informationen zum Aufnahmeprozess per E-Mail.
        </h2>
        <Button
          as="a"
          color="pink"
          href="https://form.typeform.com/to/wg4UO6p8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HeartPlus className="text-2xl" />
          Jetzt bewerben
        </Button>
      </section>
    </>
  );
};

export default MitgliedWerdenPage;
