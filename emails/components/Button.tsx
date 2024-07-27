import { Button as ButtonPrimitive } from "@react-email/components";
import { cva, VariantProps } from "cva";
import { ReactNode } from "react";

const button = cva({
  base: "items-center justify-center gap-2 px-4 py-2 text-sm font-bold hover:opacity-80",
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
}

export const Button = ({ children, href, color = "dark" }: Props) => {
  return (
    <ButtonPrimitive href={href} className={button({ color })}>
      {children}
    </ButtonPrimitive>
  );
};
