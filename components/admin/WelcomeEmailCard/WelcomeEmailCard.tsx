import { getActiveMembers, getMembers } from "@/lib/easyverein";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Await } from "../../Await/Await";
import { EmailCardForm } from "./WelcomeEmailCardForm";

export const WelcomeEmailCard = () => {
  const promise = getMembers();

  return (
    <Await
      promise={promise}
      loading={<div>Loading…</div>}
      error={<div>Error…</div>}
    >
      {(allMembers) => {
        const members = allMembers.sort((a, b) => {
          if (a._isApplication) return 1;
          if (!a.joinDate) return 1;
          if (!b.joinDate) return -1;
          return a.joinDate > b.joinDate ? -1 : 1;
        });
        return (
          <Card>
            <CardHeader>
              <CardTitle>Welcome E-Mail</CardTitle>
              <CardDescription>
                Versende Welcome E-Mails an Mitglieder:innen
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
