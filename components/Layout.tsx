'use client';

import { Logo, Profile } from 'icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const expandedNav = pathname === '/';
  return (
    <div className="flex flex-1 flex-col xl:flex-row">
      <Navigation expanded={expandedNav} />
      <main
        className={`bg-yellow-900 mx-auto flex w-full flex-1 flex-col p-4 md:p-10 xl:order-first ${
          expandedNav ? 'order-first' : 'order-last'
        }`}
      >
        <header className="mb-16 flex items-start justify-between md:mb-32">
          <Link href="/" className="hover:opacity-80">
            <Logo className="text-[45px]" />
          </Link>
          <a
            className="flex items-center justify-center space-x-2 hover:opacity-80"
            href="https://easyverein.com/public/ML/"
          >
            <Profile />
            <span>Mitgliederbereich</span>
          </a>
        </header>
        {expandedNav ? (
          children
        ) : (
          <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-y-20 md:gap-y-32">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
