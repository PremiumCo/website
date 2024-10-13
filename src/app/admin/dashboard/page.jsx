"use client"; // This makes the component a Client Component

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import axios from "axios"; // Import axios for API requests
import Navbar from "../../components/Navbar"; // Assuming you have a separate Navbar component
import AnimatedGridPattern from "../../components/ui/animated-grid-pattern";

const AdminPage = () => {
  const { data: session, status } = useSession(); // Get session and status
  const router = useRouter(); // Initialize the router
  const [hasAccess, setHasAccess] = useState(false); // State to manage access
  const guildId = "841760990637850675"; // Your Guild ID

  // Function to check if the user has access based on their role
  const checkUserAccess = async () => {
    if (session) {
      try {
        const { id: userId } = session.user; // Get user's Discord ID
        const response = await axios.get(
          "http://localhost:5000/admin/check-roles", // Replace with your API endpoint
          { params: { guildId, userId } }
        );

        if (response.data.hasAccess) {
          setHasAccess(true); // User has access
        } else {
          router.push("/"); // Redirect if no access
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        router.push("/"); // Redirect on API error
      }
    }
  };

  // Redirect to home if unauthenticated and check access if authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to home if not authenticated
    } else if (status === "authenticated") {
      checkUserAccess(); // Check access for authenticated users
    }
  }, [status, session]); // Run when status or session changes

  // Show a loading indicator while session or access check is pending
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black text-white overflow-hidden min-h-screen relative">
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar session={session} /> {/* Use your Navbar component here */}
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.5}
          duration={3.5}
          repeatDelay={0.9}
          className="inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        />

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 relative z-10">
          <div className="text-center text-2xl">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Admin Dashboard
            </h2>
            {hasAccess ? (
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Welcome to the admin area! You have the necessary permissions.
              </p>
            ) : (
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Access denied. You do not have the required permissions to view
                this page.
              </p>
            )}
            <div className="mt-8 flex gap-x-4 justify-center">
              {hasAccess && (
                <button
                  onClick={() => router.push("/admin/manage-users")} // Example for navigating to user management
                  className="inline-block rounded-lg bg-gray-950 px-3.5 py-1.5 text-base font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                >
                  Manage Users <span aria-hidden="true">→</span>
                </button>
              )}
              <button
                onClick={() => signOut()}
                className="inline-block rounded-lg bg-red-600 px-3.5 py-1.5 text-base font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                Log out <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Premium Platforming. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
