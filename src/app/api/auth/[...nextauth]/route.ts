import { authOptions } from "@/lib/configs/nextAuth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
