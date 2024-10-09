// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: '/auth/error', // Custom error page
    login: '/auth/login', // Custom error page
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // You can customize the signIn logic here if needed
      return true; // Return true to allow sign in
    },
    async redirect({ url, baseUrl }) {
      // Ensure redirect to baseUrl after login
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
