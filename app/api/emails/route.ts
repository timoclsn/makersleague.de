import { getActiveMembers } from "lib/easyverein";
import { NextRequest } from "next/server";
import { parseISO, isYesterday } from "date-fns";

const { CRON_SECRET, NODE_ENV } = process.env;

export async function GET(request: NextRequest) {
  if (NODE_ENV === "production") {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
  }

  const members = await getActiveMembers();

  console.log(members.length);

  members.forEach((member) => {
    if (member.contactDetails.name === "Timo Clasen") {
      console.log(member.joinDate);
      console.log(member.emailOrUserName);

      if (member.joinDate) {
        const joinDate = parseISO(member.joinDate);
        if (isYesterday(joinDate)) {
          console.log("joined yesterday");

          // send email
        }
      }
    }
  });

  return Response.json({
    success: true,
  });
}
