"use server";

import { createAction } from "@/lib/clients";
import { ActionError } from "@/lib/data/errors";
import { sendWelcomeMail } from "@/lib/email";
import { z } from "zod";

export const sendEmail = createAction({
  input: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  action: async ({ input }) => {
    const { name, email } = input;

    const error = await sendWelcomeMail({ name, email });

    if (error) {
      throw new ActionError({
        message: error.message,
        log: error.name,
      });
    }

    return { email };
  },
});
