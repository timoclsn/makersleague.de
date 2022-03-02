import { Button } from 'components/Button';
import { ButtonGroup } from 'components/ButtonGroup';
import { Faqs } from 'components/Faqs';
import { Fit } from 'components/Fit';
import { Page } from 'components/Page';
import { Values } from 'components/Values';
import { HeartPlus } from 'icons';

export default function Signup() {
  return (
    <Page>
      <div className="space-y-20 md:space-y-32">
        <section className="space-y-4">
          <h1 className="text-base opacity-80 md:text-2xl">Mitglied werden</h1>
          <h2 className="text-xl font-bold leading-tight md:text-5xl md:leading-tight">
            Du möchtest Teil unseres Macher*innen Netzwerks werden? Dann findest
            du hier alle wichtigen Infos und den Link zur Anmedung!
          </h2>
        </section>
        <ButtonGroup />
        <Fit />
        <Faqs />
        <Values />
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
      </div>
    </Page>
  );
}
