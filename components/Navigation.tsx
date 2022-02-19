import { Circle } from 'react-feather';

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
          color="blue"
          expanded={expanded}
        />
        <NavItem
          title="Terminen & Stammtisch"
          subtitle="Termine und Anmeldung zum nächsten Stammtisch"
          color="pink"
          expanded={expanded}
        />
        <NavItem
          title="Mitglied werden"
          subtitle="Hier geht es direkt zum Anmeldeformular"
          color="green"
          expanded={expanded}
        />
        <NavItem
          title="Blog"
          subtitle="Geschichten und Neuigkeiten rund um die Makers League"
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
  expanded?: boolean;
}

function NavItem({ title, subtitle, color = 'blue', expanded }: NavItemProps) {
  return (
    <li
      className={`${
        !expanded && 'lg:writing-vertical flex-col lg:flex-row lg:items-center'
      } flex w-1/2 flex-col justify-between space-y-12 ${colorMap[color].bg} ${
        colorMap[color].text
      } p-6 lg:h-1/2`}
    >
      <Circle size={22} />
      <div className="flex flex-col-reverse">
        <p className="text-2lg font-bold">{title}</p>
        {expanded && <span className="mb-4 opacity-80">{subtitle}</span>}
      </div>
    </li>
  );
}
