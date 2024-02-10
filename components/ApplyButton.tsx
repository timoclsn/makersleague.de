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
      href="https://form.typeform.com/to/wg4UO6p8"
      target="_blank"
      rel="noopener noreferrer"
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
