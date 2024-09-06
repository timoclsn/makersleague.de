import { Arrow } from "components/icons";
import { getBoardMembers } from "lib/members";
import { Button } from "./Button";
import { Members } from "./Members";

export const BoardMembersSection = async () => {
  const boardMembers = await getBoardMembers();

  return (
    <section id="members">
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">Unser Vorstand</h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Der Vorstand der Makers League
        </p>
        <Members members={boardMembers} />
      </div>
      <Button href="/mitglieder">
        <Arrow className="text-2xl" />
        Alle Mitglieder
      </Button>
    </section>
  );
};
