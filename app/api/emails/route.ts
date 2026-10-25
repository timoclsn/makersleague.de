import { QueueEmail, sendEmails, sendLoggingEmail } from "@/lib/email";
import { isSameDay, parseISO, subMonths } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { getActiveMembers, Member } from "lib/easyverein";
import { isAuthorizedCronRequest } from "lib/cron";
import { isBirthday } from "lib/utils";
import { NextRequest } from "next/server";

const { NODE_ENV } = process.env;

export async function GET(request: NextRequest) {
  // Protection
  if (!isAuthorizedCronRequest(request)) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const emailQueue: Array<QueueEmail> = [];

  const members = await getActiveMembers();
  const birthdayMembers: Array<Member> = [];

  const today = toZonedTime(new Date(), "UTC");
  const oneMonthAgo = subMonths(today, 1);

  for (const member of members) {
    if (member.contactDetails.dateOfBirth) {
      const dateOfBirth = toZonedTime(
        parseISO(member.contactDetails.dateOfBirth),
        "UTC",
      );

      if (isBirthday(dateOfBirth, today)) {
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

    await sendLoggingEmail({
      subject: "ML Email Cronjob",
      text: `Emails sent: ${JSON.stringify(emailQueue, null, 2)}`,
    });
  } else {
    // Don't send emails in development
    console.info("Emails: ", emailQueue);
  }

  return Response.json({ success: true });
}
