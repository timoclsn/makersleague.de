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

    // await sendWelcomeMail({ name, email });
    await sendFollowUpMail({ name, email });
  },
});
