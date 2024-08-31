import FollowUpEmail from "@/emails/emails/FollowUpEmail";
import { parseISO } from "date-fns";
import WelcomeEmail from "emails/emails/WelcomeEmail";
import { Resend } from "resend";
import { getNextEvent } from "./events";
import { formatDate } from "./utils";

const { RESEND_API_KEY } = process.env;
const resend = new Resend(RESEND_API_KEY);
const DEFAULT_FROM = "Nina von der Makers League <nina@makersleague.de>";
const DEFAULT_BCC = ["goebeltimo@gmail.com", "daniela@makersleague.de"];

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

  const { error } = await resend.emails.send({
    from: DEFAULT_FROM,
    to: [email],
    bcc: DEFAULT_BCC,
    subject: "Herzlich Willkommen in der Makers League",
    react: WelcomeEmail({
      firstName: name,
      nextStammtischDate: formatedDate,
      nextStammtischUrl: event.url,
    }),
    tags: [
      {
        name: 'category',
        value: 'welcome_email',
      },
    ],
  });

  return error;
};

export const sendFollowUpMail = async ({
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

  const { error } = await resend.emails.send({
    from: DEFAULT_FROM,
    to: [email],
    bcc: DEFAULT_BCC,
    subject: "Dein Start bei der Makers League",
    react: FollowUpEmail({
      firstName: name,
      nextStammtischDate: formatedDate,
      nextStammtischUrl: event.url,
    }),
    tags: [
      {
        name: 'category',
        value: 'follow_up_email',
      },
    ],
  });

  return error;
};