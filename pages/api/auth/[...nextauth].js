import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { verifyPassword } from "../../../lib/auth";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";

export const authOptions = {
  secret: "thequickbrownfox",
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        await connectMongoDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
