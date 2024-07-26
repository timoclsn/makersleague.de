import {
  Heading as HeadingPrimitive,
  HeadingProps,
} from "@react-email/components";
import { VariantProps, cva } from "cva";
import { ReactNode } from "react";

const styles = cva({
  base: "font-bold",
  variants: {
    level: {
      "1": "text-3xl",
      "2": "text-xl",
    },
  },
});

interface Props extends VariantProps<typeof styles> {
  children: ReactNode;
  as?: HeadingProps["as"];
}

export const Heading = ({ children, as, level = "2" }: Props) => {
  const element = as ? as : (`h${level}` as HeadingProps["as"]);
  return (
    <HeadingPrimitive as={element} className={styles({ level })}>
      {children}
    </HeadingPrimitive>
  );
};
