import { MobileNavigation } from "components/MobileNavigation";
import { Logo, Profile } from "components/icons";
import { cva, VariantProps } from "cva";
import Link from "next/link";

const header = cva({
  base: "flex items-start justify-between",
  variants: {
    variant: {
      light: "text-light",
      dark: "text-dark",
    },
  },
});

type Props = VariantProps<typeof header>;

export const Header = ({ variant = "dark" }: Props) => {
  return (
    <header className={header({ variant })}>
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
