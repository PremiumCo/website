// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds",
    }),
  ],
  pages: {
    error: "/auth/error", // Custom error page
    login: "/auth/login", // Custom login page
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        // Save the access token and refresh token on first login
        console.log("Access Token:", account.access_token); // Debugging access token
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; // Save refresh token for future use
      }
      if (user) {
        token.id = user.id || user.userId; // Ensure the user ID is stored correctly
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub || token.id; // Store Discord user ID in the session
      session.accessToken = token.accessToken; // Pass the access token to the session
      return session;
    },
    async signIn({ account }) {
      if (!account?.access_token) {
        console.error("Missing access token");
        return false; // Deny sign-in if token is missing
      }
      return true; // Allow sign-in if access token exists
    },
    async redirect({ baseUrl }) {
      return baseUrl + "/"; // Redirect to the home page after login
    },
  },
};

const handler = NextAuth(authOptions);

// Export handler for both GET and POST requests
export { handler as GET, handler as POST };
