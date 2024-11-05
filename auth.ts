import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [],
});
