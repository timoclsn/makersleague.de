"use client";

import { HeartPlus } from "icons";
import { track } from "lib/tracking";
import { usePathname } from "next/navigation";
import { Button, ButtonProps } from "./Button";

interface Props {
  className?: string;
  color?: ButtonProps["color"];
}

export const ApplyButton = ({ className, color }: Props) => {
  const pathname = usePathname();
  return (
    <Button
      as="a"
      color={color}
      href="https://form.typeform.com/to/wg4UO6p8"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        track("Apply clicked", {
          path: pathname,
        });
      }}
    >
      <HeartPlus className="text-2xl" />
      Jetzt bewerben
    </Button>
  );
};
