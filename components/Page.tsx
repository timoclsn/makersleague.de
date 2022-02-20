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
          className={`bg-yellow-900 ${
            expandedNav ? 'order-first' : 'order-last'
          } flex w-full flex-1 flex-col lg:order-first`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
