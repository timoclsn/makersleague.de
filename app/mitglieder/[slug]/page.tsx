import { Button } from "components/Button";
import { Members } from "components/Members";
import { Arrow, HeartPlus } from "icons";
import { getMemberInfosCached } from "lib/easyverein";
import { createGenerateMetadata } from "lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const generateMetadata = createGenerateMetadata(async ({ params }) => {
  const { slug } = params;
  const allMembers = await getMemberInfosCached();
  const member = allMembers.find((member) => member.slug === slug);
  if (!member) return {};

  return {
    title: member.name,
    description: `Mehr Infos über unser Mitgied ${member.name}`,
  };
});

export const generateStaticParams = async () => {
  const members = await getMemberInfosCached();

  return members.map((member) => ({
    slug: member.slug,
  }));
};

interface Props {
  params: {
    slug: string;
  };
}

const MemberPage = async ({ params }: Props) => {
  const { slug } = params;
  const allMembers = await getMemberInfosCached();
  const member = allMembers.find((member) => member.slug === slug);
  if (!member) {
    notFound();
  }
  const otherMembers = allMembers
    .filter((member) => member.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <>
      <section>
        <div className="mb-16">
          <Link href="/mitglieder" passHref legacyBehavior>
            <Button as="a">
              <Arrow className="rotate-180 text-2xl" />
              Zurück zu allen Mitgliedern
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-28 md:flex-row">
          <div className="flex-1">
            <h1 className="mb-2 text-2xl font-bold">{member.name}</h1>
            <h2 className="mb-10 text-2xl opacity-60">{member.slogan}</h2>

            <h3 className="mb-2 font-bold">Meine Superkräfte:</h3>
            <ul className="mb-8 ml-5 list-disc opacity-80">
              {member.superPowers.map((superPower, idx) => (
                <li key={idx}>{superPower}</li>
              ))}
            </ul>
            {member.about && (
              <>
                <h3 className="mb-2 font-bold">Über mich</h3>
                <div
                  className="prose opacity-80"
                  dangerouslySetInnerHTML={{ __html: member.about }}
                ></div>
              </>
            )}
          </div>
          <div className="relative mx-auto">
            <div className="absolute top-0 left-0">
              <Image
                src="/assets/frame.svg"
                alt="Image Frame"
                width={352}
                height={542}
              />
            </div>
            <div className="mx-auto mt-[75px] h-[400px] w-4/5">
              <Image
                src={`/api/get-easyverein-image?url=${encodeURIComponent(
                  member.profilePicture
                )}`}
                alt={member.name}
                width={300}
                height={300}
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue px-10 py-14">
        <h2 className="mb-12 text-4xl font-bold leading-snug">
          {`Du möchtest Teil unseres Netzwerks werden um mit spannenden
        Superheld*innen wie ${member.firstName} Ideen voranbringen zu können?`}
        </h2>
        <Link href="/mitglied-werden" passHref legacyBehavior>
          <Button as="a" color="blue-accent">
            <HeartPlus className="text-2xl" />
            Mitglied werden
          </Button>
        </Link>
      </section>
      <section>
        <h2 className="mb-2 text-2xl font-bold">Weitere Mitglieder</h2>
        <p className="mb-10 text-2xl opacity-60">
          Finde weitere Superheld*innen der Makers League
        </p>
        <Members members={otherMembers} />
        <Link href="/mitglieder" passHref legacyBehavior>
          <Button as="a" className="mt-14">
            <Arrow className="text-2xl" />
            Mehr Mitglieder
          </Button>
        </Link>
      </section>
    </>
  );
};

export default MemberPage;
