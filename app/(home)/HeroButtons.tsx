"use client";

import { Button } from "components/Button";
import { HeartPlus } from "icons";
import { track } from "lib/tracking";
import { ArrowDown } from "lucide-react";

export const HeroButtons = () => {
  const primaryButtonClicked = () => {
    const aboutUsSection = document.getElementById("about-us");
    if (!aboutUsSection) return;
    aboutUsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    track("Home hero primary clicked");
  };

  const secondaryButtonClicked = () => {
    track("Home hero secondary clicked");
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Button variant="solid" color="dark" onClick={primaryButtonClicked}>
        <ArrowDown />
        Mehr erfahren
      </Button>
      <Button
        variant="outline"
        color="dark"
        onClick={secondaryButtonClicked}
        href="/mitglied-werden"
      >
        <HeartPlus className="text-2xl" />
        Mitglied werden
      </Button>
    </div>
  );
};
