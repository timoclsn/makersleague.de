import { Section as SectionPrimitive } from "@react-email/components";
import { cx } from "cva";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Section = ({ children, className }: Props) => {
  return (
    <SectionPrimitive className={cx("mb-4", className)}>
      {children}
    </SectionPrimitive>
  );
};
