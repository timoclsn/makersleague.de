import { Instagram } from "icons";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-dark px-4 py-8 text-light md:px-10 md:py-8">
      <ul className="flex flex-col items-center space-x-0 space-y-6 overflow-hidden sm:flex-row sm:space-x-6 sm:space-y-0">
        <li className="hover:opacity-80">
          <a href="https://www.instagram.com/makersleague.ev">
            <span className="sr-only">Instagram</span>
            <Instagram className="text-2xl" />
          </a>
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
          <a href="https://github.com/timoclsn/makersleague.de">GitHub</a>
        </li>
      </ul>
    </footer>
  );
};
