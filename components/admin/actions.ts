"use server";

import { createAction } from "@/lib/clients";
import { ActionError } from "@/lib/data/errors";
import {
  sendFollowUpEmail,
  sendLoggingEmail,
  sendWelcomeEmail,
} from "@/lib/email";
import { z } from "zod";

export const sendEmail = createAction({
  input: z.object({
    name: z.string(),
    email: z.email(),
    emailType: z.enum(["welcome", "followUp"]),
  }),
  action: async ({ input }) => {
    const { name, email, emailType } = input;

    const emailConfig = {
      welcome: {
        sender: sendWelcomeEmail,
        errorSubject: "Failed to send welcome mail",
      },
      followUp: {
        sender: sendFollowUpEmail,
        errorSubject: "Failed to send follow-up mail",
      },
    } as const;

    const config = emailConfig[emailType];
    const error = await config.sender({ name, email });

    if (error) {
      await sendLoggingEmail({
        subject: config.errorSubject,
        text: `${config.errorSubject} to ${email}.`,
      });

      throw new ActionError({
        message: error.message,
        log: error.name,
      });
    }

    return { email };
  },
});
