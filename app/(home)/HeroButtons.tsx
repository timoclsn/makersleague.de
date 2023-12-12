"use client";

import { Button } from "components/Button";
import { HeartPlus } from "icons";
import { track } from "lib/tracking";
import { ArrowDown } from "lucide-react";

export const ApplyNowButton = () => {
  const onMoreClick = () => {
    const aboutUsSection = document.getElementById("about-us");
    if (!aboutUsSection) return;
    aboutUsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    track("Learn more clicked");
  };

  const onApplyNowClick = () => {
    const fitSection = document.getElementById("fit");
    if (!fitSection) return;
    fitSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    track("Apply clicked", {
      location: "Home hero",
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Button variant="solid" color="dark" onClick={onMoreClick}>
        <ArrowDown />
        Mehr erfahren
      </Button>
      <Button variant="outline" color="dark" onClick={onApplyNowClick}>
        <HeartPlus className="text-2xl" />
        Jetzt bewerben
      </Button>
    </div>
  );
};
