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
}

export const Text = ({ children, align = "left" }: Props) => {
  return (
    <TextPrimitive
      className={text({
        align,
      })}
    >
      {children}
    </TextPrimitive>
  );
};
