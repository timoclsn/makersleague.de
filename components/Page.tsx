import Link from 'next/link';
import { ReactNode, Suspense } from 'react';
import Script from 'next/script';

import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { Logo, Profile } from 'icons';
import { Seo } from './Seo';
import { Favicons } from './Favicons';

interface Props {
  children: ReactNode;
  expandedNav?: boolean;
  title: string;
  description: string;
  slug?: string;
}

export function Page({
  children,
  expandedNav,
  title,
  description,
  slug,
}: Props) {
  const pageName = 'Makers League';
  const pageTitle = title.includes(pageName)
    ? title
    : `${title}  •  ${pageName}`;
  slug = slug ? `/${slug}` : '';
  return (
    <>
      <Seo title={pageTitle} description={description} slug={slug} />
      <Favicons />
      <Script data-no-cookie data-api="/_hive" src="/bee.js" />
      <Suspense fallback={null}>
        <div className="flex flex-1 flex-col xl:flex-row">
          <Navigation expanded={expandedNav} />
          <main
            className={`bg-yellow-900 mx-auto flex w-full flex-1 flex-col p-4 md:p-10 xl:order-first ${
              expandedNav ? 'order-first' : 'order-last'
            }`}
          >
            <header className="mb-16 flex items-start justify-between md:mb-32">
              <Link href="/">
                <a className="hover:opacity-80">
                  <Logo className="text-[45px]" />
                </a>
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
        <Footer />
      </Suspense>
    </>
  );
}
