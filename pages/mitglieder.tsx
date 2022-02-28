import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { Page } from '../components/Page';
import { Button } from '../components/Button';
import mitmachen from '../public/assets/mitmachen.png';
import { Arrow } from 'icons';
import { getMemberInfos, WebsiteMember } from 'lib/easyverein';

interface Props {
  members: WebsiteMember[];
}

export default function Members({ members }: Props) {
  return (
    <Page>
      <div className="space-y-20 md:space-y-32">
        <section>
          <h1 className="mb-6 text-xl font-bold md:text-5xl">
            Unsere Mitglieder
          </h1>
          <p className="mb-16 text-base opacity-60 md:text-2xl">
            Die Superhelden der Makers League
          </p>
          <ul className="mb-14 flex flex-wrap gap-4 md:gap-8">
            {members.map((member) => (
              <li
                className="flex w-[calc(50%-8px)] flex-col items-start border-4 p-4 md:w-[calc(33.33%-22px)]"
                key={member.id}
              >
                <div className="mb-1">
                  <Image
                    src={member.profilePicture}
                    alt={member.name}
                    width={200}
                    height={200}
                  />
                </div>
                <h3 className="text-base font-bold opacity-80 md:text-2xl">
                  {member.name}
                </h3>
                <p className="pb-14">{member.slogan}</p>
                <Link href="/members">
                  <a className="flex flex-1 items-center justify-center gap-1 self-end font-bold text-pink">
                    <Arrow className="text-2xl" />
                    mehr
                  </a>
                </Link>
              </li>
            ))}

            <li className="w-[calc(50%-8px)] border-4 border-dashed p-4  text-pink md:w-[calc(33.33%-22px)]">
              <div className="mb-1">
                <Image src={mitmachen} alt="Mitmachen" placeholder="blur" />
              </div>
              <h3 className="text-base font-bold opacity-80 md:text-2xl">
                Du?
              </h3>
              <p className="pb-14">Macher*in mit Bock etwas zu bewegen!</p>
            </li>
          </ul>
        </section>
      </div>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const members = await getMemberInfos();
  return { props: { members } };
};
