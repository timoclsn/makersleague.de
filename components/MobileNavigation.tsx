"use client";

import { Book, Calendar, HeartPlus, MakersLeague } from "icons";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavItem } from "./NavItem";

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button className="hover:opacity-80 lg:hidden" onClick={toggleMenu}>
        <span className="sr-only">
          {isOpen ? "Menü schließen" : "Menü öffnen"}
        </span>
        <Menu size={16} />
      </button>
      {isOpen && (
        <nav className="fixed left-0 top-0 z-10 h-screen w-full bg-pink lg:hidden">
          <button
            className="absolute right-0 top-0 p-6 text-light hover:opacity-80"
            onClick={closeMenu}
          >
            <span className="sr-only">Menü schließen</span>
            <X />
          </button>
          <ul className="flex h-full flex-wrap">
            <NavItem
              title="Über Uns"
              subtitle="Alles über die Makers League und unsere Mitglieder"
              Icon={MakersLeague}
              color="blue"
              href="/ueber"
              onclick={closeMenu}
            />
            <NavItem
              title="Stammtisch & Events"
              subtitle="Termine und Anmeldung zum nächsten Stammtisch"
              Icon={Calendar}
              color="pink"
              href="/events"
              onclick={closeMenu}
            />
            <NavItem
              title="Mitglied werden"
              subtitle="Hier geht es direkt zur Bewerbung"
              Icon={HeartPlus}
              color="green"
              href="/mitglied-werden"
              onclick={closeMenu}
            />
            <NavItem
              title="Blog"
              subtitle="Geschichten und Neuigkeiten rund um die Makers League"
              Icon={Book}
              color="sand"
              href="/blog"
              onclick={closeMenu}
            />
          </ul>
        </nav>
      )}
    </>
  );
};
