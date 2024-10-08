import { sendFollowUpMail } from "@/lib/email";
import { isSameDay, parseISO, subMonths } from "date-fns";
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
  const oneMonthAgo = subMonths(new Date(), 1);

  members.forEach(async (member) => {
    if (!member.joinDate) {
      return;
    }

    const joinDate = parseISO(member.joinDate);

    // Follow up mail after 1 month
    if (isSameDay(joinDate, oneMonthAgo)) {
      try {
        await sendFollowUpMail({
          email: member.emailOrUserName,
          name: member.contactDetails.firstName,
        });

        console.info(`Sent follow up mail to ${member.emailOrUserName}`);
      } catch (error) {
        console.error(error);
      }
    }
  });

  return Response.json({
    success: true,
  });
}
