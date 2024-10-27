import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { twoFactorConfirmationByUserId } from "./helpers/two-factor-confirmation";
import { getAccountByUserId } from "./actions/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user, account, profile }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email }) {
      if (account.provider !== "credentials") return true;

      const existingUser = await db.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await twoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await db.TwoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.email = existingUser.email;
      token.name = existingUser.name;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },

    //session uses token returned from jwt.
    async session({ token, session }) {
      if (session.user && token.role) {
        session.user.role = token.role;
      }

      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.isTwoFactorEnabled) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
