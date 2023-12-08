import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Page = ({ children }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-y-20 md:gap-y-32">
      {children}
    </div>
  );
};
