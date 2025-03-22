import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageContent = ({ children }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-20 md:gap-32">
      {children}
    </div>
  );
};
