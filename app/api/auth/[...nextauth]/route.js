import ConnectDB from "@/app/db/Connect";
import User from "@/app/models/User";
import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        try {
          await ConnectDB();
          const user = await User.findOne({ email: credentials.email });

          const passwardOk =
            user && bcrypt.compare(credentials.password, user.password);

          if (passwardOk) {
            return {
              email: user.email,
              username: user.username, // Include username in the return object
            };
          }

          return null;
        } catch (err) {
          throw new Error("credentials  error");
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
