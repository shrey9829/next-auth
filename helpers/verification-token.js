import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (error) {
    console.log("Verification Token Error by email", error);
    return null;
  }
};
export const getVerificationTokenByToken = async (token) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    console.log("Verification Token Error by Token", error);
    return null;
  }
};
