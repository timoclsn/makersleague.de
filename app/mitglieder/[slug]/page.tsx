import { Button } from "components/Button";
import { Members } from "components/Members";
import { Page } from "components/Page";
import { Arrow, HeartPlus } from "icons";
import { getMemberInfos } from "lib/members";
import { createGenerateMetadata } from "lib/metadata";
import { getBaseUrl } from "lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export const generateMetadata = createGenerateMetadata(async ({ params }) => {
  const { slug } = params;
  const allMembers = await getMemberInfos();
  const member = allMembers.find((member) => member.slug === slug);
  if (!member) return {};

  return {
    title: member.name,
    description: `Mehr Infos über unser Mitglied ${member.name}`,
  };
});

export const generateStaticParams = async () => {
  const members = await getMemberInfos();

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
  const allMembers = await getMemberInfos();
  const member = allMembers.find((member) => member.slug === slug);
  if (!member) {
    notFound();
  }
  const otherMembers = allMembers
    .filter((member) => member.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <Page>
      <section>
        <div className="mb-16">
          <Button href="/mitglieder">
            <Arrow className="rotate-180 text-2xl" />
            Zurück zu allen Mitgliedern
          </Button>
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
            <div className="absolute left-0 top-0">
              <Image
                src="/assets/frame.svg"
                alt="Image Frame"
                width={352}
                height={542}
              />
            </div>
            <div className="mx-auto mt-[75px] h-[400px] w-4/5">
              <Image
                src={`${getBaseUrl()}/api/get-easyverein-image?url=${encodeURIComponent(
                  member.profilePicture,
                )}`}
                alt={member.name}
                width={300}
                height={300}
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
        <Button href="/mitglied-werden" color="blue-accent">
          <HeartPlus className="text-2xl" />
          Mitglied werden
        </Button>
      </section>
      <section>
        <h2 className="mb-2 text-2xl font-bold">Weitere Mitglieder</h2>
        <p className="mb-10 text-2xl opacity-60">
          Finde weitere Superheld*innen der Makers League
        </p>
        <Members members={otherMembers} />
        <Button href="/mitglieder" className="mt-14">
          <Arrow className="text-2xl" />
          Mehr Mitglieder
        </Button>
      </section>
    </Page>
  );
};

export default MemberPage;
