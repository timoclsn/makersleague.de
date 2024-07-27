import WelcomeEmail from "emails/emails/WelcomeEmail";
import { Resend } from "resend";
import { getNextEvent } from "./events";
import { parseISO } from "date-fns";
import { formatDate } from "./utils";

const { RESEND_API_KEY } = process.env;

const resend = new Resend(RESEND_API_KEY);

export const sendWelcomeMail = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const event = await getNextEvent("stammtisch");
  if (!event || !event.start || !event.url) return;

  const startDate =
    typeof event.start === "string" ? parseISO(event.start) : event.start;
  const formatedDate = formatDate(startDate, "dd.MM.");

  try {
    const { error } = await resend.emails.send({
      from: "Nina <nina@makersleague.de>",
      to: [email],
      bcc: ["goebeltimo@gmail.com"],
      subject: "Herzlich Willkommen in der Makers League! 🎉",
      react: WelcomeEmail({
        firstName: name,
        nextStammtischDate: formatedDate,
        nextStammtischUrl: event.url,
      }),
    });

    if (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};
