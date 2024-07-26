import { Text as TextPrimitive } from "@react-email/components";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Text = ({ children }: Props) => {
  return <TextPrimitive>{children}</TextPrimitive>;
};
