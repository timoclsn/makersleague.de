import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageLayoutFull = ({ children }: Props) => {
  return (
    <main className="mx-auto flex w-full flex-1 flex-col">{children}</main>
  );
};
