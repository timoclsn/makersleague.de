import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// Expand the hit area to at least 44x44px on touch devices
export const TouchTarget = ({ children }: Props) => {
  return (
    <>
      {children}
      <span
        className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
        aria-hidden="true"
      />
    </>
  );
};
