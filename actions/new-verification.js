"use server";

import { getVerificationTokenByToken } from "@/helpers/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token) => {
  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken) return { error: "Token does not exist!" };
  const hasExpired = verificationToken.expires < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await db.user.findUnique({
    where: {
      email: verificationToken.email,
    },
  });

  if (!existingUser) return { error: "Email does not exist!" };

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return { success: "Email verified!" };
};
