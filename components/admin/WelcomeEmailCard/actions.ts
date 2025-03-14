"use server";

import { createAction } from "@/lib/clients";
import { ActionError } from "@/lib/data/errors";
import { sendLoggingEmail, sendWelcomeEmail } from "@/lib/email";
import { z } from "zod";

export const sendEmail = createAction({
  input: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  action: async ({ input }) => {
    const { name, email } = input;

    const error = await sendWelcomeEmail({ name, email });

    if (error) {
      await sendLoggingEmail({
        subject: "Failed to send welcome mail",
        text: `Failed to send welcome mail to ${email}.`,
      });

      throw new ActionError({
        message: error.message,
        log: error.name,
      });
    }

    return { email };
  },
});
