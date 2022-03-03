import Link from 'next/link';
import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { Logo, Profile } from 'icons';

interface Props {
  children: ReactNode;
  expandedNav?: boolean;
}

export function Page({ children, expandedNav }: Props) {
  return (
    <>
      <div className="flex flex-1 flex-col xl:flex-row">
        <Navigation expanded={expandedNav} />
        <main
          className={`bg-yellow-900 mx-auto flex w-full flex-1 flex-col p-4 md:p-10 xl:order-first ${
            expandedNav ? 'order-first' : 'order-last max-w-screen-xl'
          }`}
        >
          <header className="mb-16 flex items-start justify-between md:mb-32">
            <Link href="/">
              <a>
                <Logo className="text-[45px]" />
              </a>
            </Link>
            <a
              className="flex items-center justify-center space-x-2"
              href="https://easyverein.com/public/ML/"
            >
              <Profile />
              <span>Mitgliederbereich</span>
            </a>
          </header>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
