import Link from 'next/link';

import { Arrow } from 'icons';
import { WebsiteMember } from 'lib/easyverein';
import { Button } from './Button';
import { Members } from './Members';

interface Props {
  members: WebsiteMember[];
}

export function MembersSection({ members }: Props) {
  return (
    <section>
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">
          Unsere Mitglieder
        </h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Die Superheld*innen der Makers League
        </p>
        <Members members={members} />
      </div>
      <Link href="/mitglieder" passHref>
        <Button as="a">
          <Arrow className="text-2xl" />
          Mehr Mitglieder
        </Button>
      </Link>
    </section>
  );
}
