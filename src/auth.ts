import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { authJsSecret, isGoogleAuthConfigured } from "@/lib/auth-env";
import { verifyMagicLinkToken } from "@/lib/magic-link";
import { resolveStaffRole } from "@/lib/staff-access";
import { verifyPassword } from "@/lib/staff-passwords";

function googleProvider() {
  if (!isGoogleAuthConfigured()) {
    return [];
  }

  return [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ];
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: authJsSecret(),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    ...googleProvider(),
    Credentials({
      id: "magic-link",
      name: "Email link",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const token = credentials?.token;
        if (typeof token !== "string" || !token) {
          return null;
        }

        const result = await verifyMagicLinkToken(token);
        if (!result.ok) {
          return null;
        }

        const role = resolveStaffRole(result.email);
        if (role === "none") {
          return null;
        }

        return {
          id: result.email,
          email: result.email,
          name: result.email,
          role,
        };
      },
    }),
    Credentials({
      id: "password",
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        const role = resolveStaffRole(email);
        const valid = await verifyPassword(email, password);
        if (role === "none" || !valid) {
          return null;
        }

        return {
          id: email,
          email,
          name: email,
          role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const email = user.email?.trim().toLowerCase();
      if (!email) {
        return false;
      }

      if (account?.provider === "google") {
        if (resolveStaffRole(email) === "none") {
          return "/login?error=not-whitelisted";
        }
        return true;
      }

      if (
        account?.provider === "magic-link" ||
        account?.provider === "password"
      ) {
        return resolveStaffRole(email) !== "none";
      }

      return false;
    },
    async jwt({ token, user }) {
      const email = user?.email ?? token.email;
      if (email) {
        token.email = email;
        token.role = resolveStaffRole(email);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const email = token.email ?? session.user.email ?? "";
        session.user.email = email;
        session.user.role = resolveStaffRole(email);
      }
      return session;
    },
  },
});
