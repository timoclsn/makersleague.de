import { sendWelcomeMail } from "@/lib/email";
import { parseISO } from "date-fns";
import { getActiveMembers } from "lib/easyverein";
import { NextRequest } from "next/server";

const { CRON_SECRET, NODE_ENV, RESEND_API_KEY } = process.env;

export async function GET(request: NextRequest) {
  // Protection
  // if (NODE_ENV === "production") {
  //   const authHeader = request.headers.get("authorization");
  //   if (authHeader !== `Bearer ${CRON_SECRET}`) {
  //     return new Response("Unauthorized", {
  //       status: 401,
  //     });
  //   }
  // }

  const members = await getActiveMembers();

  members.forEach(async (member) => {
    if (member.contactDetails.name === "Timo Clasen") {
      if (member.joinDate) {
        const joinDate = parseISO(member.joinDate);

        // Welcome mail
        //   if (isYesterday(joinDate)) {
        //     // send email
        //   }

        // Check in mail
        // if (isSameDay(joinDate, subMonths(new Date(), 1))) {
        //   // Do something
        // }
      }

      await sendWelcomeMail({
        name: member.contactDetails.firstName,
        email: member.emailOrUserName,
      });
    }
  });

  return Response.json({
    success: true,
  });
}
