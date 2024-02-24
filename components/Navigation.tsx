"use client";

import { Calendar, HeartPlus, MakersLeague } from "components/icons";
import { Eye } from "lucide-react";
import { NavItem } from "./NavItem";

export const Navigation = () => {
  return (
    <nav className="order-last hidden bg-dark lg:block">
      <ul className="sticky top-0 flex h-screen w-[160px] flex-wrap">
        <NavItem
          title="Über Uns"
          Icon={MakersLeague}
          color="blue"
          href="/ueber"
        />
        <NavItem
          title="Stammtisch & Events"
          Icon={Calendar}
          color="pink"
          href="/events"
        />
        <NavItem
          title="Mitglied werden"
          Icon={HeartPlus}
          color="green"
          href="/mitglied-werden"
        />
        <NavItem title="Einblicke" Icon={Eye} color="sand" href="/einblicke" />
      </ul>
    </nav>
  );
};
