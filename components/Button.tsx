import { VariantProps, cva } from "cva";
import Link from "next/link";
import { Children, ReactNode, forwardRef } from "react";
import { colorMap } from "./utils";

const button = cva({
  base: "inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-bold text-sm md:text-base hover:opacity-80",
  variants: {
    variant: {
      solid: null,
      outline: "ring-2 ring-inset",
      link: "px-0 py-0",
    },
    color: {
      blue: null,
      "blue-accent": null,
      pink: null,
      green: null,
      sand: null,
      dark: null,
    },
    size: {
      medium: "px-6 py-4",
      small: "px-4 py-2",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "blue",
      class: [colorMap.blue.bg, colorMap.blue.text],
    },
    {
      variant: "solid",
      color: "blue-accent",
      class: [colorMap["blue-accent"].bg, colorMap["blue-accent"].text],
    },
    {
      variant: "solid",
      color: "pink",
      class: [colorMap.pink.bg, colorMap.pink.text],
    },
    {
      variant: "solid",
      color: "green",
      class: [colorMap.green.bg, colorMap.green.text],
    },
    {
      variant: "solid",
      color: "sand",
      class: [colorMap.sand.bg, colorMap.sand.text],
    },
    {
      variant: "solid",
      color: "dark",
      class: [colorMap.dark.bg, colorMap.dark.text],
    },
    {
      variant: "outline",
      color: "blue",
      class: "text-blue ring-blue",
    },
    {
      variant: "outline",
      color: "blue-accent",
      class: "text-blue-accent ring-blue-accent",
    },
    {
      variant: "outline",
      color: "pink",
      class: "text-dark ring-pink",
    },
    {
      variant: "outline",
      color: "green",
      class: "text-green ring-green",
    },
    {
      variant: "outline",
      color: "sand",
      class: "text-dark ring-sand",
    },
    {
      variant: "outline",
      color: "dark",
      class: "text-dark ring-dark",
    },
    {
      variant: "link",
      color: "blue",
      class: "text-blue",
    },
    {
      variant: "link",
      color: "blue-accent",
      class: "text-blue-accent",
    },
    {
      variant: "link",
      color: "pink",
      class: "text-pink",
    },
    {
      variant: "link",
      color: "green",
      class: "text-green",
    },
    {
      variant: "link",
      color: "sand",
      class: "text-sand",
    },
    {
      variant: "link",
      color: "dark",
      class: "text-dark",
    },
  ],
});

type ButtonVariants = VariantProps<typeof button>;

interface CommmonProps {
  children: ReactNode;
  title?: string;
  color?: keyof typeof colorMap;
  className?: string;
}

type ConditionalProps =
  | {
      type?: "button" | "submit" | "reset";
      onClick?: () => void;
      disabled?: boolean;
      href?: never;
      target?: never;
      rel?: never;
    }
  | {
      href?: string;
      target?: "_blank";
      rel?: "noopener noreferrer" | "noopener";
      type?: never;
      onClick?: () => void;
      disabled?: never;
    };

export type ButtonProps = CommmonProps & ConditionalProps & ButtonVariants;

export const Button = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    children,
    type = "button",
    variant = "solid",
    color = "blue",
    size = "medium",
    className,
    href,
    ...props
  },
  ref,
) {
  const Element = href ? Link : "button";

  return (
    <Element
      type={Element === "button" ? type : undefined}
      ref={ref}
      className={button({ variant, color, size, class: className })}
      href={href ?? ""}
      {...props}
    >
      {Children.map(children, (child, index) => (
        <span key={index}>{child}</span>
      ))}
    </Element>
  );
});
