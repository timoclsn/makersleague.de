import { sendFollowUpMail, sendLoggingMail } from "@/lib/email";
import { isSameDay, parseISO, subMonths } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { getActiveMembers } from "lib/easyverein";
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
  const oneMonthAgo = toZonedTime(subMonths(new Date(), 1), "UTC");

  for (const member of members) {
    if (!member.joinDate) {
      continue;
    }

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

  return Response.json({
    success: true,
  });
}
