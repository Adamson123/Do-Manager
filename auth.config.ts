import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { signInSchema } from "@/schemas";
import { getUserByEmail } from "@/data";
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
          user.password = "";
          console.log({ passwordMatch, user });
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
