import FollowUpEmail from "@/emails/emails/FollowUpEmail";
import { parseISO } from "date-fns";
import WelcomeEmail from "emails/emails/WelcomeEmail";
import { Resend } from "resend";
import { Member } from "./easyverein";
import { getNextEvent, WebsiteEvent } from "./events";
import { formatDate } from "./utils";

const { RESEND_API_KEY } = process.env;

const resend = new Resend(RESEND_API_KEY);

const DEFAULT_FROM = "Nina von der Makers League <nina@makersleague.de>";

export const sendLoggingMail = async ({
  subject,
  text,
}: {
  subject: string;
  text: string;
}) => {
  const { error } = await resend.emails.send({
    from: DEFAULT_FROM,
    to: ["goebeltimo@gmail.com"],
    subject,
    text,
  });

  return error;
};

const getStammtischData = (event: WebsiteEvent) => {
  if (!event.start || !event.url) return;

  const startDate =
    typeof event.start === "string" ? parseISO(event.start) : event.start;
  const formatedDate = formatDate(startDate, "dd.MM.");

  return {
    date: formatedDate,
    url: event.url,
  };
};

export const sendWelcomeMail = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const event = await getNextEvent("stammtisch");

  const { error } = await resend.emails.send({
    from: DEFAULT_FROM,
    to: [email],
    bcc: ["goebeltimo@gmail.com", "daniela@makersleague.de"],
    subject: "Herzlich Willkommen in der Makers League",
    react: WelcomeEmail({
      firstName: name,
      nextStammtisch: event ? getStammtischData(event) : undefined,
    }),
    tags: [
      {
        name: "category",
        value: "welcome_email",
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

  const { error } = await resend.emails.send({
    from: DEFAULT_FROM,
    to: [email],
    bcc: ["goebeltimo@gmail.com", "daniela@makersleague.de"],
    subject: "Dein Start bei der Makers League",
    react: FollowUpEmail({
      firstName: name,
      nextStammtisch: event ? getStammtischData(event) : undefined,
    }),
    tags: [
      {
        name: "category",
        value: "follow_up_email",
      },
    ],
  });

  return error;
};

export const sendBirthdayNotificationMail = async (members: Array<Member>) => {
  const today = new Date();

  const formattedMembersList = members
    .map((member) => {
      const birthDate = parseISO(member.contactDetails?.dateOfBirth || "");
      const age = today.getFullYear() - birthDate.getFullYear();

      return `- ${member.contactDetails.name} (wird heute ${age} Jahre alt) - ${member.emailOrUserName}`;
    })
    .join("\n");

  const text = `Geburtstage heute:\n\n${formattedMembersList}`;

  const { error } = await resend.emails.send({
    from: DEFAULT_FROM,
    to: ["hello@makersleague.de"],
    bcc: ["goebeltimo@gmail.com"],
    subject: `🎂 ML-Geburtstage am ${formatDate(today, "dd.MM.yyyy")}`,
    text,
    tags: [
      {
        name: "category",
        value: "birthday_notification",
      },
    ],
  });

  return error;
};
