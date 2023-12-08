import { Logo, Profile } from "icons";
import Link from "next/link";
import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { MobileNavigation } from "./MobileNavigation";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-1 flex-row">
      <Navigation />
      <main className="bg-yellow-900 mx-auto flex w-full flex-1 flex-col p-4 md:p-10">
        <header className="mb-16 flex items-start justify-between md:mb-32">
          <Link href="/" className="hover:opacity-80">
            <Logo className="text-[24px] lg:text-[45px]" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex items-center gap-8">
            <a
              className="flex items-center justify-center space-x-2 hover:opacity-80"
              href="https://easyverein.com/public/ML/"
            >
              <Profile />
              <span>Mitgliederbereich</span>
            </a>
            <MobileNavigation />
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-y-20 md:gap-y-32">
          {children}
        </div>
      </main>
    </div>
  );
};
