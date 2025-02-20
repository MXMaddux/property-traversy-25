import GoogleProvider from "next-auth/providers/google";
import { AuthOptions, Session } from "next-auth";
import connectDb from "@/config/database";
import User from "@/models/User";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile, user }: { profile?: any; user: any }) {
      try {
        // 1. Connect to db
        await connectDb();

        // 2. Check if user exists
        const userExists = await User.findOne({ email: profile?.email });

        // 3. If not, create user
        if (!userExists) {
          const username = profile?.name?.slice(0, 20);
          await User.create({
            email: profile?.email,
            username,
            image: profile?.image,
          });
        }

        // 4. Return true to allow signin
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async session({ session, token }: { session: Session; token: any }) {
      try {
        // 1. Get user from db
        const user = await User.findOne({ email: session.user?.email });

        // 2. Assign user id to session
        if (session.user && user) {
          session.user.id = user._id.toString(); // Convert ObjectId to string
        }

        // 3. Return session
        return session;
      } catch (error) {
        console.error("Error during session callback:", error);
        return session;
      }
    },
  },
};
