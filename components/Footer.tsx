import { Instagram } from "icons";
import { Linkedin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-dark px-4 py-8 text-light md:px-10 md:py-8">
      <ul className="flex flex-col items-center gap-6 overflow-hidden md:flex-row">
        <li className="hover:opacity-80">
          <Link href="https://www.instagram.com/makersleague.ev">
            <span className="sr-only">Instagram</span>
            <Instagram className="text-2xl" />
          </Link>
        </li>
        <li className="hover:opacity-80">
          <Link href="https://www.linkedin.com/company/makersleague/">
            <span className="sr-only">LinkedIn</span>
            <Linkedin />
          </Link>
        </li>
        <li className="hover:opacity-80">
          <Link href="/impressum">Impressum</Link>
        </li>
        <li className="hover:opacity-80">
          <Link href="/datenschutzerklaerung">Datenschutzerklärung</Link>
        </li>
        <li className="hover:opacity-80">
          <Link href="/docs/Makers_League_eV_Satzung.pdf">Satzung</Link>
        </li>
        <li className="hover:opacity-80">
          <Link href="/docs/Makers_League_eV_Beitragsordnung.pdf">
            Beitragsordnung
          </Link>
        </li>
        <li className="hover:opacity-80">
          <Link href="https://github.com/timoclsn/makersleague.de">GitHub</Link>
        </li>
      </ul>
    </footer>
  );
};
