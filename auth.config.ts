import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { signInSchema } from "@/schemas";
import { getUserByEmail } from "@/data";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

/**
 * coming from AUTH CONFIG!!!
 */
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,  
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validation = signInSchema.safeParse(credentials);

        if (validation.success) {
          const { email, password } = validation.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          //user.password = "";

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
