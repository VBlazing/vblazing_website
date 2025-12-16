/*
 * @Author: VBlazing
 * @Date: 2025-12-15 15:21:02
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-12-15 15:25:24
 * @Description: auth config
 */
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/login",
  },
});
