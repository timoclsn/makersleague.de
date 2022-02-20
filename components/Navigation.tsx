import { FunctionComponent, SVGProps } from 'react';
import MakersLeague from '../assets/ic-makersLeague.svg';
import Date from '../assets/ic-date.svg';
import HeartPlus from '../assets/ic-heartPlus.svg';
import Book from '../assets/ic-book.svg';

interface Props {
  expanded?: boolean;
}

export function Navigation({ expanded }: Props) {
  return (
    <nav className="bg-red-900">
      <ul
        className={`${
          expanded ? 'lg:w-[640px]' : 'lg:w-[160px]'
        } bg-green-900 sticky top-0 flex w-full flex-wrap lg:h-screen`}
      >
        <NavItem
          title="Über Uns"
          subtitle="Alles über die Makers League und unsere Mitglieder"
          Icon={MakersLeague}
          color="blue"
          expanded={expanded}
        />
        <NavItem
          title="Terminen & Stammtisch"
          subtitle="Termine und Anmeldung zum nächsten Stammtisch"
          Icon={Date}
          color="pink"
          expanded={expanded}
        />
        <NavItem
          title="Mitglied werden"
          subtitle="Hier geht es direkt zum Anmeldeformular"
          Icon={HeartPlus}
          color="green"
          expanded={expanded}
        />
        <NavItem
          title="Blog"
          subtitle="Geschichten und Neuigkeiten rund um die Makers League"
          Icon={Book}
          color="sand"
          expanded={expanded}
        />
      </ul>
    </nav>
  );
}

const colorMap = {
  blue: {
    text: 'text-dark',
    bg: 'bg-blue',
  },
  pink: {
    text: 'text-light',
    bg: 'bg-pink',
  },
  green: {
    text: 'text-light',
    bg: 'bg-green',
  },
  sand: {
    text: 'text-dark',
    bg: 'bg-sand',
  },
} as const;

interface NavItemProps {
  title: string;
  subtitle: string;
  color?: keyof typeof colorMap;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  expanded?: boolean;
}

function NavItem({
  title,
  subtitle,
  color = 'blue',
  Icon,
  expanded,
}: NavItemProps) {
  return (
    <li
      className={`${
        !expanded && 'lg:writing-vertical flex-col lg:flex-row lg:items-center'
      } flex w-1/2 flex-col justify-between space-y-12 ${colorMap[color].bg} ${
        colorMap[color].text
      } p-6 lg:h-1/2`}
    >
      <Icon className={`${colorMap[color].text} text-[24px]`} />
      <div className="flex flex-col-reverse">
        <p className="text-2lg font-bold">{title}</p>
        {expanded && <span className="mb-4 opacity-80">{subtitle}</span>}
      </div>
    </li>
  );
}
