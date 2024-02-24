import Image from "next/image";
import contactImage from "./nina-kuch.png";
import { Arrow } from "components/icons";
import Link from "next/link";

export const ContactSection = () => {
  return (
    <section id="contact">
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">
          Deine Ansprechpartnerin vor Ort
        </h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Bei Fragen, melde dich bei Nina!
        </p>
        <div className="flex justify-center">
          <div className="w-full border-4 border-dashed border-dark p-4 sm:w-auto">
            <Image src={contactImage} alt="Nina Kuch" className="mb-5 w-full" />
            <h3 className="break-word w-full text-base font-bold opacity-80 md:text-2xl">
              Nina Kuch
            </h3>
            <p>3. Vorstandsvorsitzende</p>
            <a href="mailto:nina@makersleague.de" className="mb-14 block">
              nina@makersleague.de
            </a>
            <div className="flex w-full flex-1 flex-col items-end justify-end">
              <Link
                href="/mitglieder/nina-kuch"
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
