"use client";

import { track } from "lib/tracking";
import { wait } from "lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

const CALENDAR_SUB_URL =
  "https://easyverein.com/public/ML/calendar/0ff376db31eeaf3f8360c51092852e73ec2a2e5bc256f96a1e79792b1059845/calendar.ics";

export const CopyCalendarUrlButton = () => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (!navigator.clipboard) return;
    setCopied(true);
    navigator.clipboard.writeText(CALENDAR_SUB_URL);
    track("Copy calendar subscription url");
    await wait(3000);
    setCopied(false);
  };
  return (
    <Button color="pink" variant="outline" size="small" onClick={handleClick}>
      {copied ? <Check size={20} /> : <Copy size={20} />}
      Abo Link kopieren
    </Button>
  );
};
