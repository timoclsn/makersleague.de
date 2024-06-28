import { isSameDay, parseISO, subMonths } from "date-fns";
import WelcomeEmail from "emails/emails/WelcomeEmail";
import { getActiveMembers } from "lib/easyverein";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const { CRON_SECRET, NODE_ENV, RESEND_API_KEY } = process.env;

const resend = new Resend(RESEND_API_KEY);

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

      try {
        const { error } = await resend.emails.send({
          from: "Nina <nina@makersleague.de>",
          to: [member.emailOrUserName],
          bcc: ["goebeltimo@gmail.com"],
          subject: "Herzlich Willkommen in der Makers League! 🎉",
          react: WelcomeEmail({ firstName: member.contactDetails.firstName }),
        });

        if (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  return Response.json({
    success: true,
  });
}
