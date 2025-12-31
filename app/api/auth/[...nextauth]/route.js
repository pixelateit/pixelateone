// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export const authOptions = {
  providers: [
    // Credentials login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) return null;

        // ❌ Block Google-only users from logging in with credentials
        if (user.isGoogleAccount) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.profilePicture,
          isGoogleAccount: user.isGoogleAccount,
        };
      },
    }),

    // Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;

        // detect provider
        if (account?.provider === "google") {
          token.isGoogleAccount = true;
        } else {
          token.isGoogleAccount = user.isGoogleAccount || false;
        }

        token.rememberMe = user.rememberMe ?? false;

        const expiry = token.rememberMe
          ? 60 * 60 * 24 * 30 // 30 days
          : 60 * 60 * 24; // 1 day
        token.exp = Math.floor(Date.now() / 1000) + expiry;
      }

      if (token.exp && Date.now() / 1000 > token.exp) return null;
      return token;
    },

    async session({ session, token }) {
      if (!token) return null;

      session.user = {
        id: token.sub || token.id,
        name: token.name,
        email: token.email,
        image: token.picture,
        isGoogleAccount: token.isGoogleAccount,
      };
      session.rememberMe = token.rememberMe;
      session.expires = new Date(token.exp * 1000).toISOString();
      return session;
    },

    // Auto-create user on Google sign in
    async signIn({ user, account }) {
      await dbConnect();

      if (account?.provider === "google") {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // ❌ reject if not pre-registered
          return false;
        }

        // ❌ Reject if the user was registered with credentials, not Google
        if (!existingUser.isGoogleAccount) {
          return false;
        }

        // ✅ Sync Google profile picture if changed
        if (user.image && existingUser.profilePicture !== user.image) {
          existingUser.profilePicture = user.image;
          await existingUser.save();
        }

        user.id = existingUser._id.toString();
        user.image = existingUser.profilePicture;
        user.isGoogleAccount = true;
      }

      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
