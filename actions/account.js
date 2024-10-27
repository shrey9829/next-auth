import { db } from "@/lib/db";

export const getAccountByUserId = async (userId) => {
  try {
    const account = db.Account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
};
