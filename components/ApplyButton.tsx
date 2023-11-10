"use client";

import { HeartPlus } from "icons";
import { track } from "lib/tracking";
import { usePathname } from "next/navigation";
import { Button, ButtonProps } from "./Button";
import Link from "next/link";

interface Props {
  className?: string;
  color?: ButtonProps["color"];
}

export const ApplyButton = ({ className, color }: Props) => {
  const pathname = usePathname();
  return (
    <Button
      as={Link}
      color={color}
      href="/mitglied-werden/antrag"
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
