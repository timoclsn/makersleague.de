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

export type EmailType =
  | "welcome"
  | "followUp"
  | "birthdayNotification"
  | "logging";

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

export const sendBirthdayNotificationMail = async ({
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

type InferEmailPayload<T extends EmailType> = T extends "welcome"
  ? Parameters<typeof sendWelcomeMail>[0]
  : T extends "followUp"
    ? Parameters<typeof sendFollowUpMail>[0]
    : T extends "birthdayNotification"
      ? Parameters<typeof sendBirthdayNotificationMail>[0]
      : T extends "logging"
        ? Parameters<typeof sendLoggingMail>[0]
        : never;

export type EmailPayload = {
  [T in EmailType]: { type: T } & InferEmailPayload<T>;
}[EmailType];

const sendEmail = async (payload: EmailPayload) => {
  try {
    let error;

    switch (payload.type) {
      case "welcome":
        error = await sendWelcomeMail(payload);
        break;
      case "followUp":
        error = await sendFollowUpMail(payload);
        break;
      case "birthdayNotification":
        error = await sendBirthdayNotificationMail(payload);
        break;
      case "logging":
        error = await sendLoggingMail(payload);
        break;
    }

    if (error) {
      await sendLoggingMail({
        subject: `Failed to send ${payload.type} email`,
        text: error.message,
      });
    }
  } catch (error) {
    await sendLoggingMail({
      subject: `Error sending ${payload.type} email`,
      text: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const sendEmails = async (payloads: Array<EmailPayload>) => {
  // Count emails by type before sending
  const emailCounts = payloads.reduce(
    (acc, payload) => {
      acc[payload.type] = (acc[payload.type] || 0) + 1;
      return acc;
    },
    {} as Record<EmailType, number>,
  );

  // Use allSettled to ensure all emails are sent
  const results = await Promise.allSettled(payloads.map(sendEmail));

  const failed = results.filter((r) => r.status === "rejected").length;
  const succeeded = results.length - failed;

  const summaryMailContent = [
    `📧 Email Summary:`,
    `Total: ${payloads.length} emails`,
    `Success: ${succeeded}`,
    `Failed: ${failed}`,
    `\nBy type:`,
    ...Object.entries(emailCounts).map(
      ([type, count]) => `- ${type}: ${count}`,
    ),
  ];

  const summaryText = summaryMailContent.join("\n");

  console.info(summaryText);

  await sendLoggingMail({
    subject: "Email sending summary",
    text: summaryText,
  });
};
