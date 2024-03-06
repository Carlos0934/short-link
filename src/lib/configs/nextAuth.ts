import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.SECRET_KEY,

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,

      profile(profile, tokens) {
        return {
          id: profile.id.toString(),
          email: profile.login,
          name: profile.name,
          image: profile.avatar_url,
        };
      },
    }),
  ],
};
