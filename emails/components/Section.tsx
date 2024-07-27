import { Section as SectionPrimitive } from "@react-email/components";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Section = ({ children }: Props) => {
  return <SectionPrimitive className="mb-4">{children}</SectionPrimitive>;
};
