import Link from 'next/link';
import Image from 'next/image';

import { WebsiteMember } from 'lib/easyverein';
import { Arrow } from 'icons';

interface Props {
  members: WebsiteMember[];
}

export function Members({ members }: Props) {
  return (
    <ul className="flex flex-wrap gap-4 md:gap-8">
      {members.map((member, idx) => (
        <li
          className={`${
            idx === 0 ? 'oder-1' : 'order-last'
          } flex w-[calc(50%-8px)] flex-col items-start border-4 p-4 md:w-[calc(33.33%-22px)]`}
          key={member.id}
        >
          <div className="mb-1">
            <Image
              src={`/api/easyverein?url=${encodeURIComponent(
                member.profilePicture
              )}`}
              alt={member.name}
              width={700}
              height={700}
              quality={100}
            />
          </div>
          <h3 className="break-word w-full text-base font-bold opacity-80 md:text-2xl">
            {member.name}
          </h3>
          <p className="w-full break-words pb-14">{member.slogan}</p>
          <Link href={`/mitglieder/${member.slug}`}>
            <a className="flex flex-1 items-center justify-center gap-1 self-end font-bold text-pink">
              <Arrow className="text-2xl" />
              mehr
            </a>
          </Link>
        </li>
      ))}
      <li className="order-2 w-[calc(50%-8px)] border-4 border-dashed p-4 text-pink md:w-[calc(33.33%-22px)]">
        <div className="mb-1">
          <Image
            src="/assets/doodle-new-member-placeholder.svg"
            alt="Mitmachen"
            width={700}
            height={700}
          />
        </div>
        <h3 className="text-base font-bold opacity-80 md:text-2xl">Du?</h3>
        <p className="pb-14">Macher*in mit Bock etwas zu bewegen!</p>
      </li>
    </ul>
  );
}
