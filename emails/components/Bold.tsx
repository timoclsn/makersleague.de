import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Bold = ({ children }: Props) => {
  return <span className="font-bold">{children}</span>;
};
