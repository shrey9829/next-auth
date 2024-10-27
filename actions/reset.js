"use server";

import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordToken } from "@/lib/token";
import { ResetPasswordSchema } from "@/schemas";

export const reset = async (values) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const passwordToken = await generatePasswordToken(email);
  await sendPasswordResetEmail(passwordToken.email, passwordToken.token);

  return { success: "Reset email sent!" };
};
