import type { NextPage } from 'next';
import Image from 'next/image';

import { Page } from '../components/Page';
import MakersLeague from '../assets/ic-makersLeague.svg';
import Profile from '../assets/ic-profile.svg';

const Home: NextPage = () => {
  return (
    <Page expandedNav>
      <div className="flex h-full flex-1 flex-col">
        <div className="space-y-32 px-10 pt-10">
          <header className="flex items-start justify-between">
            <MakersLeague className="text-[45px]" />
            <a className="flex items-center justify-center space-x-2">
              <Profile />
              <span>Mitgliederbereich</span>
            </a>
          </header>
          <div className="space-y-4">
            <h1 className="text-2xl opacity-80">Makers League e. V.</h1>
            <h2 className="text-5xl font-bold leading-tight">
              Die Gemeinschaft für Macher*innen in Esslingen, die zusammen Ideen
              voranbringen. Wir entdecken, was in uns steckt und setzen Kräfte
              frei!
            </h2>
          </div>
        </div>
        <div className="relative min-h-[360px] flex-1 overflow-hidden">
          <div className="absolute left-0 bottom-0">
            <Image
              src="/assets/doodle-selfie.svg"
              alt="Picture of the author"
              width={200}
              height={336}
            />
          </div>
          <div className="absolute left-48 bottom-0 -mb-24">
            <Image
              src="/assets/doodle-loving.svg"
              alt="Picture of the author"
              width={300}
              height={336}
            />
          </div>
          <div className="absolute bottom-0 right-0 -mr-64">
            <Image
              src="/assets/doodle-coffee.svg"
              alt="Picture of the author"
              width={500}
              height={336}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Home;
