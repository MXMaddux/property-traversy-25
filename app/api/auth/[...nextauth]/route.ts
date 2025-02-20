import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` property
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // Ensure the `User` interface includes the `id` property
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
