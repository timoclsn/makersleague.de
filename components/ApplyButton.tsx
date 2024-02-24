"use client";

import { HeartPlus } from "components/icons";
import { track } from "lib/tracking";
import { Button } from "./Button";

interface Props {
  className?: string;
}

export const ApplyButton = ({ className }: Props) => {
  return (
    <Button
      color="green"
      href="/mitglied-werden/bewerbung"
      className={className}
      onClick={() => {
        track("Apply clicked");
      }}
    >
      <HeartPlus className="text-2xl" />
      Jetzt bewerben
    </Button>
  );
};
