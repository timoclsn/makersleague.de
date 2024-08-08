import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Italic = ({ children }: Props) => {
  return <span className="italic">{children}</span>;
};
