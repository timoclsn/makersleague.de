import type { NextPage } from 'next';
import { Button } from '../components/Button';
import { Page } from '../components/Page';
import Profile from '../assets/ic-profile.svg';
import Watch from '../assets/ic-watch.svg';
import Date from '../assets/ic-date.svg';

const Blog: NextPage = () => {
  return (
    <Page>
      <div className="space-y-20 md:space-y-32">
        <h1 className="mb-6 text-xl font-bold md:text-5xl">Blog</h1>
        <article>
          <h2 className="mb-2 text-base font-bold md:text-2xl">
            Noch einmal mit Gefühl
          </h2>
          <p className="mb-4 text-base opacity-60 md:text-2xl">
            Zum Jahresabschluss kommen (fast) alle zusammen: Die Makers League
            hat einen neuen Vorstand!
          </p>
          <ul className="mb-8 flex flex-wrap gap-4 md:gap-8">
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Profile className="text-xl" />
              <span>Niklas Ehrentreich</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Watch className="text-xl" />
              <span>7 min</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Date className="text-xl" />
              <span>23. Dez 2021</span>
            </li>
          </ul>
          <p className="mb-8">
            Eine Kachel nach der anderen wird hell. Darin: mehr oder minder gut
            ausgeleuchtete Gesichter, die Augen geradeaus, konzentriert an den
            Einstellungen fummelnd. Hört ihr mich? Ja, wir hören dich.
            <br />
            <br />
            Die Jahreshauptversammlung der Makers League am 14.12. fand, wie
            sollte es anders sein, online statt. Dafür war die Teilnahme auch
            für diejenigen möglich, die dem kalten Esslingen für ein paar Tage
            den Rücken gekehrt hatten: Vorstand Till Augner schaltete sich aus
            Südafrika zu und führte, ab und an...
          </p>
          <Button color="sand">Weiterlesen...</Button>
        </article>
        <article>
          <h2 className="mb-2 text-base font-bold md:text-2xl">
            Noch einmal mit Gefühl
          </h2>
          <p className="mb-4 text-base opacity-60 md:text-2xl">
            Zum Jahresabschluss kommen (fast) alle zusammen: Die Makers League
            hat einen neuen Vorstand!
          </p>
          <ul className="mb-8 flex flex-wrap gap-4 md:gap-8">
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Profile className="text-xl" />
              <span>Niklas Ehrentreich</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Watch className="text-xl" />
              <span>7 min</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Date className="text-xl" />
              <span>23. Dez 2021</span>
            </li>
          </ul>
          <p className="mb-8">
            Eine Kachel nach der anderen wird hell. Darin: mehr oder minder gut
            ausgeleuchtete Gesichter, die Augen geradeaus, konzentriert an den
            Einstellungen fummelnd. Hört ihr mich? Ja, wir hören dich.
            <br />
            <br />
            Die Jahreshauptversammlung der Makers League am 14.12. fand, wie
            sollte es anders sein, online statt. Dafür war die Teilnahme auch
            für diejenigen möglich, die dem kalten Esslingen für ein paar Tage
            den Rücken gekehrt hatten: Vorstand Till Augner schaltete sich aus
            Südafrika zu und führte, ab und an...
          </p>
          <Button color="sand">Weiterlesen...</Button>
        </article>
      </div>
    </Page>
  );
};

export default Blog;
