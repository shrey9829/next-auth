import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token) => {
  try {
    const twoFactorToken = await db.TwoFactorToken.findUnique({
      where: {
        token,
      },
    });

    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email) => {
  try {
    const twoFactorToken = await db.TwoFactorToken.findFirst({
      where: {
        email,
      },
    });

    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
