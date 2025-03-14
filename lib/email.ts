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

export const sendLoggingEmail = async ({
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

export const sendWelcomeEmail = async ({
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
  });

  return error;
};

const getFollowUpEmail = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const event = await getNextEvent("stammtisch");

  return {
    from: DEFAULT_FROM,
    to: [email],
    bcc: ["goebeltimo@gmail.com", "daniela@makersleague.de"],
    subject: "Dein Start bei der Makers League",
    react: FollowUpEmail({
      firstName: name,
      nextStammtisch: event ? getStammtischData(event) : undefined,
    }),
  };
};

const getBirthdayNotificationEmail = async ({
  members,
}: {
  members: Array<Member>;
}) => {
  const today = new Date();

  const formattedMembersList = members
    .map((member) => {
      const birthDate = parseISO(member.contactDetails?.dateOfBirth || "");
      const age = today.getFullYear() - birthDate.getFullYear();

      return `- ${member.contactDetails.name} (wird heute ${age} Jahre alt) - ${member.emailOrUserName}`;
    })
    .join("\n");

  const text = `Geburtstage heute:\n\n${formattedMembersList}`;

  return {
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
  };
};

// Map of email types that can be send via the queue
const queueEmailsMap = {
  followUp: getFollowUpEmail,
  birthdayNotification: getBirthdayNotificationEmail,
} as const;

type QueueEmailsMap = typeof queueEmailsMap;
type QueueEmailType = keyof QueueEmailsMap;
export type QueueEmail = {
  [K in QueueEmailType]: { type: K; args: Parameters<QueueEmailsMap[K]>[0] };
}[QueueEmailType];

export const sendEmails = async (emails: Array<QueueEmail>) => {
  try {
    const resendEmailPromises = emails.map((email) => {
      // @ts-expect-error: Can' get the type right here
      return queueEmailsMap[email.type](email.args);
    });

    const resendEmails = await Promise.all(resendEmailPromises);

    const { error } = await resend.batch.send(resendEmails);

    if (error) {
      throw new Error(error.message, { cause: error });
    }

    await sendLoggingEmail({
      subject: "Emails sent",
      text: `Emails sent: ${JSON.stringify(emails, null, 2)}`,
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    await sendLoggingEmail({
      subject: "Error sending batch emails",
      text: `Error sending batch emails: ${JSON.stringify(emails, null, 2)}`,
    });
  }
};
