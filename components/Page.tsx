import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Navigation } from './Navigation';

interface Props {
  children: ReactNode;
  expandedNav?: boolean;
}

export function Page({ children, expandedNav }: Props) {
  return (
    <>
      <div className="flex flex-1 flex-col lg:flex-row">
        <Navigation expanded={expandedNav} />
        <main
          className={`bg-yellow-900 flex w-full flex-1 flex-col p-4 md:p-10 lg:order-first ${
            expandedNav ? 'order-first' : 'order-last'
          }`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
