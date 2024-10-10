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
    login: '/auth/login', // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Check if the user object exists (first login)
      if (user) {
        // You may need to ensure user.id is available here.
        // Discord doesn't always return an id, you might need to check your user object.
        token.id = user.id || user.userId; // Ensure the user ID is included
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure user ID is set in the session
      if (token.id) {
        session.user.id = token.id; // Add the user ID to the session
      }
      return session;
    },
    async signIn() {
      // You can customize the signIn logic here if needed
      return true; // Return true to allow sign in
    },
    async redirect({ url, baseUrl }) {
      // Ensure redirect to the desired URL after login
      // You can customize this logic based on your application flow
      return baseUrl + "/";
    },
  },
};

const handler = NextAuth(authOptions);

// Exporting the handler for both GET and POST requests
export { handler as GET, handler as POST };
