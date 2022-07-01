import type { NextPage } from 'next';
import Image from 'next/future/image';

import { Page } from '../components/Page';

const Home: NextPage = () => {
  return (
    <Page
      expandedNav
      title="Makers League"
      description="Makers League – Die Gemeinschaft für Macher:innen, die zusammen Ideen voranbringen. Wir entdecken, was in uns steckt und setzen Kräfte frei!"
    >
      <div className="flex h-full flex-1 flex-col">
        <div className="mx-auto max-w-screen-xl space-y-4">
          <h1 className="text-base opacity-80 md:text-2xl">
            Makers League e. V.
          </h1>
          <h2 className="text-xl font-bold leading-tight md:text-5xl md:leading-tight">
            Die Gemeinschaft für Macher*innen in Esslingen, die zusammen Ideen
            voranbringen. Wir entdecken, was in uns steckt und setzen Kräfte
            frei!
          </h2>
        </div>

        <div className="relative -mx-4 -mb-4 min-h-[200px] flex-1 overflow-hidden md:-mx-10 md:-mb-10 md:min-h-[500px]">
          <div className="absolute left-0 bottom-0 w-[100px] md:w-[200px]">
            <Image
              src="/assets/doodle-selfie.svg"
              alt="Doodle Selfie"
              width={200}
              height={336}
              priority
            />
          </div>
          <div className="absolute left-1/2 bottom-0 -ml-16 -mb-12 w-[160px] md:-ml-32 md:-mb-24 md:w-[300px]">
            <Image
              src="/assets/doodle-loving.svg"
              alt="Doodle Loving"
              width={300}
              height={336}
              priority
            />
          </div>
          <div className="absolute bottom-8 right-0 -mr-24 w-[260px] md:-mr-64 md:w-[600px]">
            <Image
              src="/assets/doodle-coffee.svg"
              alt="Doodle Coffee"
              width={500}
              height={336}
              priority
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Home;
