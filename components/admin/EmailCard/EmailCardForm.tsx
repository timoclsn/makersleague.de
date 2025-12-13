"use client";

import { sendEmail } from "@/components/admin/actions";
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
import { useToast } from "@/ui/use-toast";
import { Loader2, Mail } from "lucide-react";

interface Props {
  members: Array<Member>;
}

export const EmailCardForm = ({ members }: Props) => {
  const { toast } = useToast();
  const { runAction, isRunning } = useAction(sendEmail, {
    onSuccess: (data) => {
      if (!data) return;
      const { email, emailType } = data;
      const typeText = emailType === "welcome" ? "Welcome" : "Follow-Up";

      toast({
        variant: "default",
        title: "Erfolg!",
        description: `${typeText} E-Mail an ${email} wurde versendet.`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fehler!",
        description: "Etwas ist schiefgelaufen.",
      });
      console.error(error);
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      action={(formData) => {
        const id = Number(formData.get("member"));
        const emailType = formData.get("emailType") as "welcome" | "followUp";
        const member = members.find((member) => member.id === id);

        if (!member) {
          toast({
            variant: "destructive",
            title: "Fehler!",
            description: "Ausgewähltes Mitglied nicht gefunden.",
          });

          return;
        }

        runAction({
          email: member.emailOrUserName,
          name: member.contactDetails.firstName,
          emailType,
        });
      }}
    >
      <Select name="emailType" required defaultValue="welcome">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="E-Mail Typ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="welcome">Welcome E-Mail</SelectItem>
          <SelectItem value="followUp">Follow-Up E-Mail</SelectItem>
        </SelectContent>
      </Select>

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
