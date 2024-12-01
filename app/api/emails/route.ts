import { sendFollowUpMail } from "@/lib/email";
import { isSameDay, parseISO, subMonths } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { getActiveMembers } from "lib/easyverein";
import { NextRequest } from "next/server";

const { CRON_SECRET, NODE_ENV } = process.env;

let followUpEmailCount = 0;

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
        await sendFollowUpMail({
          email: member.emailOrUserName,
          name: member.contactDetails.firstName,
        });

        console.info(`Sent follow up mail to ${member.emailOrUserName}`);
        followUpEmailCount++;
      } catch (error) {
        console.error(
          `Failed to send follow up mail to ${member.emailOrUserName}:`,
          error,
        );
      }
    }
  }

  return Response.json({
    success: true,
  });
}
