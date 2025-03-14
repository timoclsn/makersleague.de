import {
  sendBirthdayNotificationMail,
  sendFollowUpMail,
  sendLoggingMail,
} from "@/lib/email";
import { isSameDay, parseISO, subMonths } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { getActiveMembers, Member } from "lib/easyverein";
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

  const members = await getActiveMembers();

  const today = toZonedTime(new Date(), "UTC");
  const oneMonthAgo = toZonedTime(subMonths(new Date(), 1), "UTC");

  const birthdayMembers: Array<Member> = [];

  for (const member of members) {
    // Birthday notification member collection
    if (member.contactDetails.dateOfBirth) {
      const dateOfBirth = toZonedTime(
        parseISO(member.contactDetails.dateOfBirth),
        "UTC",
      );

      // Check if today is the member's birthday (comparing month and day only)
      if (
        today.getDate() === dateOfBirth.getDate() &&
        today.getMonth() === dateOfBirth.getMonth()
      ) {
        birthdayMembers.push(member);
      }
    }

    // Foww up mail handling
    if (member.joinDate) {
      const joinDate = toZonedTime(parseISO(member.joinDate), "UTC");

      // Follow up mail after 1 month
      if (isSameDay(joinDate, oneMonthAgo)) {
        try {
          const error = await sendFollowUpMail({
            email: member.emailOrUserName,
            name: member.contactDetails.firstName,
          });

          if (error) {
            throw new Error(error.message, { cause: error });
          }

          console.info(`Sent follow up mail to ${member.emailOrUserName}`);
        } catch (error) {
          console.error(
            `Failed to send follow up mail to ${member.emailOrUserName}:`,
            error,
          );
          await sendLoggingMail({
            subject: "Failed to send follow up mail",
            text: `Failed to send follow up mail to ${member.emailOrUserName}.`,
          });
        }
      }
    }
  }

  // Birthday notification mail
  if (birthdayMembers.length > 0) {
    try {
      const error = await sendBirthdayNotificationMail(birthdayMembers);

      if (error) {
        throw new Error(error.message, { cause: error });
      }

      console.info(
        `Sent birthday notification email for ${birthdayMembers.length} members`,
      );
    } catch (error) {
      console.error("Failed to send birthday notification email:", error);
      await sendLoggingMail({
        subject: "Failed to send birthday notification email",
        text: `Failed to send birthday notification email for ${birthdayMembers.length} members.`,
      });
    }
  }

  return Response.json({
    success: true,
  });
}
