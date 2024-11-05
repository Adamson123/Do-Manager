import Github from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";

/**
 * coming from AUTH CONFIG
 */
export default {
  providers: [Github],
} satisfies NextAuthConfig;
