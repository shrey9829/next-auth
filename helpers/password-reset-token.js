import { db } from "@/lib/db";

export const getPasswordTokenByToken = async (token) => {
  try {
    const passwordToken = await db.ResetPasswordToken.findUnique({
      where: {
        token,
      },
    });

    return passwordToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordTokenByEmail = async (email) => {
  try {
    const passwordToken = await db.ResetPasswordToken.findFirst({
      where: {
        email,
      },
    });

    return passwordToken;
  } catch (error) {
    return null;
  }
};
