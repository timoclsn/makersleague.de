import { Link as LinkPrimitive } from "@react-email/components";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
}

export const Link = ({ children, href }: Props) => {
  return (
    <LinkPrimitive href={href} className="text-dark underline">
      {children}
    </LinkPrimitive>
  );
};
