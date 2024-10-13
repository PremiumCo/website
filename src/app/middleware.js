import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Add the routes that require authentication
const protectedRoutes = ['/admin', '/admin/dashboard'];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // If user is not authenticated, redirect to home page
  if (!token) {
    console.log('User not logged in, redirecting to home...');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Extract necessary values from the token (e.g., user ID)
  const userId = token.sub; // This contains the user's Discord ID

  try {
    // Replace with your API URL
    const guildId = '841760990637850675';
    const response = await fetch(
      `http://localhost:5000/admin/check-roles?guildId=${guildId}&userId=${userId}`
    );

    const data = await response.json();
    console.log('Role check response:', data);

    // If the user doesn't have access, redirect to home page
    if (!data.hasAccess) {
      console.log('Access denied, redirecting to home...');
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch (error) {
    console.error('Error checking user role:', error);
    // Redirect to home page in case of error
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow the request to continue if the user is authenticated and has access
  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ['/admin/:path*'],
};
