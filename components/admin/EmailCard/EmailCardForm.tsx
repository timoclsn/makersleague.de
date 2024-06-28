"use client";

import { useAction } from "@/lib/data/client";
import { Member } from "@/lib/easyverein";
import { Button } from "@/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { sendEmail } from "./actions";
import { Loader2, Mail } from "lucide-react";

interface Props {
  members: Array<Member>;
}

export const EmailCardForm = ({ members }: Props) => {
  const { runAction, isRunning } = useAction(sendEmail);

  return (
    <form
      className="flex flex-col gap-4"
      action={(formData) => {
        const id = Number(formData.get("member"));
        const member = members.find((member) => member.id === id);
        if (!member) return;

        // TODO: Remove guard
        if (member.contactDetails.name === "Timo Clasen") {
          runAction({
            email: member.emailOrUserName,
            name: member.contactDetails.firstName,
          });
        }
      }}
    >
      <Select name="member" required>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Mitglied" />
        </SelectTrigger>
        <SelectContent>
          {members.map((member) => {
            return (
              <SelectItem key={member.id} value={String(member.id)}>
                {member.contactDetails.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type="submit" disabled={isRunning} className="flex gap-2">
        {isRunning ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Mail className="size-4" />
        )}
        E-Mail senden
      </Button>
    </form>
  );
};
