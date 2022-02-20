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
      <div className="flex flex-1 flex-col-reverse lg:flex-row-reverse">
        <Navigation expanded={expandedNav} />
        <main className="bg-yellow-900 w-full">{children}</main>
      </div>
      <Footer />
    </>
  );
}
