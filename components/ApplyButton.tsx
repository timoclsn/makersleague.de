"use client";

import { HeartPlus } from "icons";
import { track } from "lib/tracking";
import { Button, ButtonProps } from "./Button";

interface Props {
  className?: string;
  color?: ButtonProps["color"];
  trackingLocation: string;
}

export const ApplyButton = ({ className, color, trackingLocation }: Props) => {
  return (
    <Button
      color={color}
      href="/mitglied-werden/bewerbung"
      className={className}
      onClick={() => {
        track("Apply clicked", {
          location: trackingLocation,
        });
      }}
    >
      <HeartPlus className="text-2xl" />
      Jetzt bewerben
    </Button>
  );
};
