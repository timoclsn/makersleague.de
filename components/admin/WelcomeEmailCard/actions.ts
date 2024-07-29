"use server";

import { createAction } from "@/lib/clients";
import { sendFollowUpMail, sendWelcomeMail } from "@/lib/email";
import { z } from "zod";

export const sendEmail = createAction({
  input: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  action: async ({ input }) => {
    const { name, email } = input;

    await sendFollowUpMail({ name, email });
    await sendWelcomeMail({ name, email });
  },
});
