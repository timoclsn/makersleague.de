import { Book, Calendar, HeartPlus, MakersLeague } from "icons";
import { NavItem } from "./NavItem";

interface Props {
  expanded?: boolean;
}

export function Navigation({ expanded }: Props) {
  return (
    <nav className="bg-dark">
      <ul
        className={`${
          expanded ? "xl:w-[640px]" : "xl:w-[160px]"
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
          subtitle="Hier geht es direkt zur Bewerbung"
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
