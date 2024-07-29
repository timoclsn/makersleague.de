import { Text as TextPrimitive } from "@react-email/components";
import { cva, VariantProps } from "cva";
import { ReactNode } from "react";

const text = cva({
  base: "",
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
    },
  },
});

interface Props extends VariantProps<typeof text> {
  children: ReactNode;
  className?: string;
}

export const Text = ({ children, align = "left", className }: Props) => {
  return (
    <TextPrimitive
      className={text({
        align,
        className,
      })}
    >
      {children}
    </TextPrimitive>
  );
};
