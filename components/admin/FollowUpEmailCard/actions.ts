"use server";

import { createAction } from "@/lib/clients";
import { ActionError } from "@/lib/data/errors";
import { sendFollowUpEmail, sendLoggingEmail } from "@/lib/email";
import { z } from "zod";

export const sendEmail = createAction({
  input: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  action: async ({ input }) => {
    const { name, email } = input;

    const error = await sendFollowUpEmail({ name, email });

    if (error) {
      await sendLoggingEmail({
        subject: "Failed to send follow-up mail",
        text: `Failed to send follow-up mail to ${email}.`,
      });

      throw new ActionError({
        message: error.message,
        log: error.name,
      });
    }

    return { email };
  },
});
