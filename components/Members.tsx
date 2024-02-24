import { Arrow } from "components/icons";
import { WebsiteMember } from "lib/members";
import { getBaseUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  members: WebsiteMember[];
}

export const Members = ({ members }: Props) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
      {members.map((member, idx) => (
        <li
          className={`${
            idx === 0 ? "oder-1" : "order-last"
          } overflow-hidden border-4 p-4`}
          key={member.id}
        >
          <Link href={`/mitglieder/${member.slug}`}>
            <div className="group flex h-full flex-col items-start">
              <Image
                src={`${getBaseUrl()}/api/get-easyverein-image?url=${encodeURIComponent(
                  member.profilePicture,
                )}`}
                alt={member.name}
                width={700}
                height={700}
                quality={100}
                className="mb-5 block"
              />
              <h3 className="break-word w-full text-base font-bold opacity-80 md:text-2xl">
                {member.name}
              </h3>
              <p className="w-full break-words pb-14">{member.slogan}</p>
              <div className="flex w-full flex-1 flex-col items-end justify-end">
                <span className="flex items-center justify-center gap-1 self-end font-bold text-pink group-hover:opacity-80">
                  <Arrow className="text-2xl" />
                  mehr
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
      <li className="order-2 border-4 border-dashed p-4 text-pink">
        <Link href="/mitglied-werden">
          <div className="group flex h-full flex-col items-start">
            <Image
              src="/assets/doodle-new-member-placeholder.svg"
              alt="Mitmachen"
              width={700}
              height={700}
              className="mb-5 block"
            />
            <h3 className="text-base font-bold opacity-80 md:text-2xl">Du?</h3>
            <p className="pb-14">Macher*in mit Bock etwas zu bewegen!</p>
            <div className="flex w-full flex-1 flex-col items-end justify-end">
              <span className="flex items-center justify-center gap-1 self-end font-bold text-pink group-hover:opacity-80">
                <Arrow className="text-2xl" />
                mehr
              </span>
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
};
