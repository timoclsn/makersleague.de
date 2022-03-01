import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { Page } from '../../components/Page';
import { getMemberInfos, WebsiteMember } from 'lib/easyverein';
import { Button } from 'components/Button';
import { Arrow, HeartPlus } from 'icons';
import { Members } from 'components/Members';

interface Props {
  members: WebsiteMember[];
  slug: string;
}

export default function BlogPostPage({ members, slug }: Props) {
  const member = members.find((member) => member.slug === slug)!;
  return (
    <Page>
      <div className="space-y-24">
        <div className="mb-16">
          <Link href="/mitglieder" passHref>
            <Button as="a">
              <Arrow className="rotate-180 text-2xl" />
              Zurück zu allen Mitgliedern
            </Button>
          </Link>
        </div>
        <section className="flex flex-col gap-28 md:flex-row">
          <div className="flex-1">
            <h1 className="mb-2 text-2xl font-bold">{member.name}</h1>
            <h2 className="mb-10 text-2xl opacity-60">{member.slogan}</h2>

            <h3 className="mb-2 font-bold">Meinen Superkräfte:</h3>
            <ul className="mb-8 list-inside list-disc opacity-80">
              {member.superPowers.map((superPower, idx) => (
                <li key={idx}>{superPower}</li>
              ))}
            </ul>
            {member.about && (
              <>
                <h3 className="mb-2 font-bold">Über mich</h3>
                <div
                  className="opacity-80"
                  dangerouslySetInnerHTML={{ __html: member.about }}
                ></div>
              </>
            )}
          </div>
          <div>
            <Image
              src={member.profilePicture}
              alt={member.name}
              width={300}
              height={300}
            />
          </div>
        </section>
        <section className="bg-blue px-10 py-14">
          <h2 className="mb-12 text-4xl font-bold leading-snug">
            {`Du möchtest Teil unseres Netzwerks werden um mit spannenden
            Superhelden wie ${member.firstName} Ideen voranbringen zu können?`}
          </h2>
          <Link href="/mitgliedwerden" passHref>
            <Button as="a" color="blue-accent">
              <HeartPlus className="text-2xl" />
              Mitglied werden
            </Button>
          </Link>
        </section>
        <section>
          <h2 className="mb-2 text-2xl font-bold">Weitere Mitglieder</h2>
          <p className="mb-10 text-2xl opacity-60">
            Finde weitere Superhelden der Makers League
          </p>
          <Members
            members={members}
            showJoin={false}
            excludeId={member.id}
            limit={6}
          />
          <Link href="/mitglieder" passHref>
            <Button as="a">
              <Arrow className="text-2xl" />
              Alle Mitglieder
            </Button>
          </Link>
        </section>
      </div>
    </Page>
  );
}

export async function getStaticPaths() {
  const members = await getMemberInfos();
  return {
    paths: members.map((member) => ({
      params: { slug: member.slug },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const members = await getMemberInfos();
  return { props: { members, slug: params?.slug } };
};
