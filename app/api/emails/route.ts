import { QueueEmail, sendEmails } from "@/lib/email";
import { isSameDay, parseISO, subMonths } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { getActiveMembers, Member } from "lib/easyverein";
import { isBirthday } from "lib/utils";
import { NextRequest } from "next/server";

const { CRON_SECRET, NODE_ENV } = process.env;

export async function GET(request: NextRequest) {
  // Protection
  if (NODE_ENV === "production") {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
  }

  const emailQueue: Array<QueueEmail> = [];

  const members = await getActiveMembers();
  const birthdayMembers: Array<Member> = [];

  const oneMonthAgo = toZonedTime(subMonths(new Date(), 1), "UTC");

  for (const member of members) {
    if (member.contactDetails.dateOfBirth) {
      const dateOfBirth = toZonedTime(
        parseISO(member.contactDetails.dateOfBirth),
        "UTC",
      );

      if (isBirthday(dateOfBirth)) {
        birthdayMembers.push(member);
      }
    }

    if (member.joinDate) {
      const joinDate = toZonedTime(parseISO(member.joinDate), "UTC");

      if (isSameDay(joinDate, oneMonthAgo)) {
        emailQueue.push({
          type: "followUp",
          args: {
            name: member.contactDetails.firstName,
            email: member.emailOrUserName,
          },
        });
      }
    }
  }

  if (birthdayMembers.length > 0) {
    emailQueue.push({
      type: "birthdayNotification",
      args: { members: birthdayMembers },
    });
  }

  if (NODE_ENV === "production") {
    if (emailQueue.length !== 0) {
      await sendEmails(emailQueue);
    }
  } else {
    console.info("Emails: ", emailQueue);
  }

  return Response.json({ success: true });
}
