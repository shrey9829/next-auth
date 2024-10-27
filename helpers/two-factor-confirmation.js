import { db } from "@/lib/db";

export const twoFactorConfirmationByUserId = async (userId) => {
  try {
    const twoFactorConfirmation = await db.TwoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });

    return twoFactorConfirmation;
  } catch (error) {
    console.log(error);
    return null;
  }
};
