import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "./prisma/client";

/**
 * Now this is coming from AUTH.TS!!!
 */

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({ token, session }) {
            console.log({ token, session });
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.createdAt = token.createdAt;
            }
            return session;
        },
        async jwt({ token }) {
            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
});
