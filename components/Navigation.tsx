import Link from 'next/link';
import { useRouter } from 'next/router';

import { Book, Calendar, HeartPlus, Icon, MakersLeague } from 'icons';
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
        } sticky top-0 flex w-full flex-wrap xl:h-screen`}
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
          title="Stammtisch & Events"
          subtitle="Termine und Anmeldung zum nächsten Stammtisch"
          Icon={Calendar}
          color="pink"
          expanded={expanded}
          href="/events"
        />
        <NavItem
          title="Mitglied werden"
          subtitle="Hier geht es direkt zum Anmeldeformular"
          Icon={HeartPlus}
          color="green"
          expanded={expanded}
          href="/mitglied-werden"
        />
        <NavItem
          title="Blog"
          subtitle="Geschichten und Neuigkeiten rund um die Makers League"
          Icon={Book}
          color="sand"
          expanded={expanded}
          href="/blog"
        />
      </ul>
    </nav>
  );
}

interface NavItemProps {
  title: string;
  subtitle: string;
  color?: keyof typeof colorMap;
  Icon: Icon;
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
      className={`w-1/2 xl:h-1/2 ${colorMap[color].bg} ${colorMap[color].text} group`}
    >
      <Link href={href}>
        <div
          className={`${
            !expanded &&
            'xl:writing-vertical flex-col xl:flex-row xl:items-center'
          } flex h-full w-full flex-col justify-between space-y-12 p-6`}
        >
          <Icon className={`${colorMap[color].text} text-[24px]`} />
          <div className="flex flex-col-reverse group-hover:opacity-80">
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
        </div>
      </Link>
    </li>
  );
}
