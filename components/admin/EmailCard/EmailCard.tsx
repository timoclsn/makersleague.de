import { getActiveMembers } from "@/lib/easyverein";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Await } from "../../Await/Await";
import { EmailCardForm } from "./EmailCardForm";

export const EmailCard = () => {
  const promise = getActiveMembers();

  return (
    <Await
      promise={promise}
      loading={<div>Loading…</div>}
      error={<div>Error…</div>}
    >
      {(members) => {
        return (
          <Card>
            <CardHeader>
              <CardTitle>E-Mails</CardTitle>
              <CardDescription>
                Versende E-Mails an Mitglieder:innen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailCardForm members={members} />
            </CardContent>
          </Card>
        );
      }}
    </Await>
  );
};
