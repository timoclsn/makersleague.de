import { Button as ButtonPrimitive } from "@react-email/components";
import { cva, VariantProps } from "cva";
import { ReactNode } from "react";

const button = cva({
  base: "gap-2 px-6 py-4 text-sm font-bold hover:opacity-80",
  variants: {
    color: {
      dark: "bg-dark text-light",
      light: "bg-light text-dark",
    },
  },
});

interface Props extends VariantProps<typeof button> {
  children: ReactNode;
  href: string;
  className?: string;
}

export const Button = ({
  children,
  href,
  color = "dark",
  className,
}: Props) => {
  return (
    <ButtonPrimitive href={href} className={button({ color, className })}>
      {children}
    </ButtonPrimitive>
  );
};
