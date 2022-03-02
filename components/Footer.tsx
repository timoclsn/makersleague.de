import { Instagram } from 'icons';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-dark px-4 py-8 text-light md:px-10 md:py-8">
      <ul className="flex flex-col items-center space-x-0 space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0">
        <li>
          <a href="https://www.instagram.com/makersleague.ev">
            <span className="sr-only">Instagram</span>
            <Instagram className="text-2xl" />
          </a>
        </li>
        <li>
          <Link href="/impressum">
            <a>Impressum</a>
          </Link>
        </li>
        <li>
          <Link href="/datenschutzerklärung">
            <a>Datenschutzerklärung</a>
          </Link>
        </li>
        <li>
          <Link href="/satzung">
            <a>Satzung</a>
          </Link>
        </li>
        <li>
          <Link href="/beitragsordnung">
            <a>Beitragsordnung</a>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
