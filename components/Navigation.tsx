import { FunctionComponent, SVGProps } from 'react';
import MakersLeague from '../assets/ic-makersLeague.svg';
import Date from '../assets/ic-date.svg';
import HeartPlus from '../assets/ic-heartPlus.svg';
import Book from '../assets/ic-book.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { colorMap } from './utils';

interface Props {
  expanded?: boolean;
}

export function Navigation({ expanded }: Props) {
  return (
    <nav className="bg-dark">
      <ul
        className={`${
          expanded ? 'xl:w-[640px]' : 'xl:w-[160px]'
        } sticky top-0 flex w-full flex-wrap xl:h-[calc(100vh-88px)]`}
      >
        <NavItem
          title="Über Uns"
          subtitle="Alles über die Makers League und unsere Mitglieder"
          Icon={MakersLeague}
          color="blue"
          expanded={expanded}
          href="/ueber"
        />
        <NavItem
          title="Terminen & Stammtisch"
          subtitle="Termine und Anmeldung zum nächsten Stammtisch"
          Icon={Date}
          color="pink"
          expanded={expanded}
          href="/test"
        />
        <NavItem
          title="Mitglied werden"
          subtitle="Hier geht es direkt zum Anmeldeformular"
          Icon={HeartPlus}
          color="green"
          expanded={expanded}
          href="/test"
        />
        <NavItem
          title="Blog"
          subtitle="Geschichten und Neuigkeiten rund um die Makers League"
          Icon={Book}
          color="sand"
          expanded={expanded}
          href="/test"
        />
      </ul>
    </nav>
  );
}

interface NavItemProps {
  title: string;
  subtitle: string;
  color?: keyof typeof colorMap;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  expanded?: boolean;
  href: string;
}

function NavItem({
  title,
  subtitle,
  color = 'blue',
  Icon,
  expanded,
  href,
}: NavItemProps) {
  const router = useRouter();
  return (
    <li
      className={`w-1/2 xl:h-1/2 ${colorMap[color].bg} ${colorMap[color].text}`}
    >
      <Link href={href}>
        <a
          className={`${
            !expanded &&
            'xl:writing-vertical flex-col xl:flex-row xl:items-center'
          } flex h-full w-full flex-col justify-between space-y-12 p-6`}
        >
          <Icon className={`${colorMap[color].text} text-[24px]`} />
          <div className="flex flex-col-reverse">
            <p
              className={`text-2lg font-bold ${
                router.pathname.includes(href) && 'underline'
              }`}
            >
              {title}
            </p>
            {expanded && (
              <span className="mb-4 text-sm opacity-80 md:text-base">
                {subtitle}
              </span>
            )}
          </div>
        </a>
      </Link>
    </li>
  );
}
