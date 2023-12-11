import { MobileNavigation } from "components/MobileNavigation";
import { Logo, Profile } from "icons";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="mb-16 flex items-start justify-between md:mb-32">
      <Link href="/" className="hover:opacity-80">
        <Logo className="text-[24px] lg:text-[45px]" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="flex items-center gap-8">
        <a
          className="flex items-center justify-center gap-2 hover:opacity-80"
          href="https://easyverein.com/public/ML/"
        >
          <Profile />
          <span>Mitgliederbereich</span>
        </a>
        <MobileNavigation />
      </div>
    </header>
  );
};
