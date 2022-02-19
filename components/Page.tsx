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
      <div className="blog flex-1 flex-row-reverse lg:flex">
        <Navigation expanded={expandedNav} />
        <main className="bg-yellow-900 p-10">{children}</main>
      </div>
      <Footer />
    </>
  );
}
