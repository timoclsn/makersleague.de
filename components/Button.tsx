import { cva, VariantProps } from "class-variance-authority";
import { Children, ElementType, forwardRef, ReactNode } from "react";

import { colorMap } from "./utils";

const button = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "space-x-2",
    "cursor-pointer",
    "disabled:opacity-50",
    "font-bold",
    "text-sm md:text-base",
    "hover:opacity-80",
  ],
  {
    variants: {
      variant: {
        solid: ["px-6", "py-4"],
        link: [],
      },
      color: {
        blue: [colorMap.blue.bg, colorMap.blue.text],
        "blue-accent": [
          colorMap["blue-accent"].bg,
          colorMap["blue-accent"].text,
        ],
        pink: [colorMap.pink.bg, colorMap.pink.text],
        green: [colorMap.green.bg, colorMap.green.text],
        sand: [colorMap.sand.bg, colorMap.sand.text],
        dark: [colorMap.dark.bg, colorMap.dark.text],
      },
    },
    compoundVariants: [{ variant: "link", class: "!bg-[transparent]" }],
  },
);

type ButtonVariants = VariantProps<typeof button>;

interface CommmonProps {
  as?: ElementType;
  children: ReactNode;
  title?: string;
  color?: keyof typeof colorMap;
  className?: string;
  href?: string;
  target?: "_blank";
  rel?: "noopener noreferrer" | "noopener";
  type?: never;
  onClick?: () => void;
}

export type ButtonProps = CommmonProps & ButtonVariants;

export const Button = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    children,
    as: Element = "button",
    type = "button",
    variant = "solid",
    color = "blue",
    className,
    ...props
  },
  ref,
) {
  return (
    <Element
      type={Element === "button" ? type : undefined}
      ref={ref}
      className={button({ variant, color, class: className })}
      {...props}
    >
      {Children.map(children, (child, index) => (
        <span key={index}>{child}</span>
      ))}
    </Element>
  );
});
