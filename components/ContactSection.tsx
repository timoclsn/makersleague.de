import { Arrow } from "components/icons";
import { getWebsiteMemberByName } from "lib/members";
import Link from "next/link";
import { MemberImage } from "./MemberImage";

interface Props {
  name: string;
  email: string;
  subtitle: string;
}

export const ContactSection = async ({ name, email, subtitle }: Props) => {
  const member = await getWebsiteMemberByName(name);

  if (!member) {
    return null;
  }

  return (
    <section id="contact">
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">
          Deine Ansprechpartnerin vor Ort
        </h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Bei Fragen, melde dich bei {member.firstName}!
        </p>
        <div className="flex justify-center">
          <div className="w-full border-4 border-dashed border-dark p-4 sm:w-auto">
            <MemberImage member={member} size={700} className="mb-5 w-full" />
            <h3 className="w-full break-words text-base font-bold opacity-80 md:text-2xl">
              {member.name}
            </h3>
            <p>{subtitle}</p>
            <a href={`mailto:${email}`} className="mb-14 block">
              {email}
            </a>
            <div className="flex w-full flex-1 flex-col items-end justify-end">
              <Link
                href={`/mitglieder/${member.slug}`}
                className="flex items-center justify-center gap-1 self-end font-bold text-pink hover:opacity-80"
              >
                <Arrow className="text-2xl" />
                Steckbrief
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
