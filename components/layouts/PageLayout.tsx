import { ReactNode } from "react";
import { Header } from "../Header";

interface Props {
  children: ReactNode;
}

export const PageLayout = ({ children }: Props) => {
  return (
    <main className="mx-auto flex w-full flex-1 flex-col p-4 md:p-10">
      <Header />
      {children}
    </main>
  );
};
