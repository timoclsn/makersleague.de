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

  members.forEach(async (member) => {
    if (member.contactDetails.name === "Timo Clasen") {
      // TODO: Remove guard
      if (member.joinDate) {
        const joinDate = parseISO(member.joinDate);

        // Check in mail
        if (isSameDay(joinDate, subMonths(new Date(), 1))) {
          await sendFollowUpMail({
            email: member.emailOrUserName,
            name: member.contactDetails.firstName,
          });
        }
      }
    }
  });

  return Response.json({
    success: true,
  });
}
