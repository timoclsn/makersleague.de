import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Navigation } from './Navigation';

interface Props {
  children: ReactNode;
}

export function Page({ children }: Props) {
  return (
    <>
      <div className="flex flex-1 flex-row-reverse">
        <Navigation />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
