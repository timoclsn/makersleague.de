"use client";

import { Calendar, HeartPlus, MakersLeague } from "components/icons";
import { House } from "lucide-react";
import { NavItem } from "./NavItem";

export const Navigation = () => {
  return (
    <nav className="bg-dark order-last hidden lg:block">
      <ul className="sticky top-0 flex h-screen w-[160px] flex-wrap">
        <NavItem
          title="Über Uns"
          Icon={MakersLeague}
          color="blue"
          href="/ueber"
        />
        <NavItem title="Events" Icon={Calendar} color="pink" href="/events" />
        <NavItem
          title="Mitglied werden"
          Icon={HeartPlus}
          color="green"
          href="/mitglied-werden"
        />
        <NavItem title="Der Ort" Icon={House} color="sand" href="/makers-inn" />
      </ul>
    </nav>
  );
};
