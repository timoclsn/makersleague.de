import WelcomeEmail from "emails/emails/WelcomeEmail";
import { Resend } from "resend";

const { RESEND_API_KEY } = process.env;

const resend = new Resend(RESEND_API_KEY);

export const sendWelcomeMail = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  try {
    const { error } = await resend.emails.send({
      from: "Nina <nina@makersleague.de>",
      to: [email],
      bcc: ["goebeltimo@gmail.com"],
      subject: "Herzlich Willkommen in der Makers League! 🎉",
      react: WelcomeEmail({ firstName: name }),
    });

    if (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};
