import { Arrow } from "icons";
import { getWebsiteMembers, getMembersCount } from "lib/members";
import { Button } from "./Button";
import { Members } from "./Members";

export const MembersSection = async () => {
  const allMembers = await getWebsiteMembers();
  const members = allMembers.sort(() => Math.random() - 0.5).slice(0, 5);
  const membersCount = await getMembersCount();

  return (
    <section id="members">
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">
          Unsere Mitglieder
        </h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Wir sind {membersCount} Superheld*innen der Makers League
        </p>
        <Members members={members} />
      </div>
      <Button href="/mitglieder">
        <Arrow className="text-2xl" />
        Mehr Mitglieder
      </Button>
    </section>
  );
};
