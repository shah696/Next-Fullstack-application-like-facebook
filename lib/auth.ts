import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./mongodb";
import User from "@/app/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check for email/password presence
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // 1. Database Connection check
          await dbConnect();

          // 2. User ko find karein aur password select karein
          const userDoc = await User.findOne({
            email: credentials.email,
          }).select("+password");

          if (!userDoc) {
            // User not found ya password mismatch par 'null' return karna theek hai.
            console.log("Login Attempt Failed: User not found.");
            return null;
          }

          // 3. Password Comparison
          const isMatch = await userDoc.comparePassword(credentials.password);

          if (!isMatch) {
            console.log("Login Attempt Failed: Password mismatch.");
          }

          // console.log("Login Attempt successfull");
          return {
            id: userDoc._id.toString(),
            email: userDoc.email,
            name: userDoc.name,
          };
        } catch (error) {
          // 🛑 CRITICAL FIX: Koi bhi unhandled exception yahan catch ho jayegi.
          // Isse NextAuth /api/auth/error par redirect hone ki bajaye
          // client ko result.error return karega.
          console.error("FATAL AUTHORIZE ERROR:", error);
          return null; // Null return karne se frontend par result.error aa jayega.
        }
      },
    }),
  ],

  // ... rest of the config remains the same ...

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
