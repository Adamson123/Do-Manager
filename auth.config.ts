import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { signInSchema } from "@/schemas";
import getUserByEmail from "@/data/getUserByEmail";
import bcrypt from "bcryptjs";
import { RawUserTypes } from "@/types/userTypes";

/**
 * coming from AUTH CONFIG!!!
 */
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validation = signInSchema.safeParse(credentials);

        if (validation.success) {
          const { email, password } = validation.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log(passwordMatch, user);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
  // callbacks: {
  //   async session({ session, token: AuthToken }) {
  //     // Attach additional user information to the session

  //     const token = AuthToken as unknown as RawUserTypes & {
  //       iap: string;
  //       jti: string;
  //       exp: string;
  //       picture: string;
  //       sub: string;
  //     };
  //     session.user = {
  //       ...session.user,
  //       ...token,
  //     };
  //     return session;
  //   },
  //   async jwt({ token, user: AuthUser }) {
  //     // When user is defined, copy over the user data into the token
  //     const user = AuthUser as unknown as RawUserTypes;

  //     if (user) {
  //       token.id = user.id;
  //       token.name = user.name;
  //       token.email = user.email;
  //       token.image = user.image;
  //       token.createdAt = user.createdAt;
  //       token.updatedAt = user.updatedAt;
  //     }
  //     return token;
  //   },
  // },
} satisfies NextAuthConfig;
