"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AnimatedGridPattern from "../components/ui/animated-grid-pattern"; // Assume this component is defined
import { cn } from "../lib/utils"; // Utility function for class names

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Careers", href: "/careers" },
    { name: "Products", href: "/#" },
    { name: "Company", href: "/staff" },
  ];

export default function StaffPage() {
  const [roles, setRoles] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession(); // Use NextAuth session with status
  const [loadingRoles, setLoadingRoles] = useState(true); // Loading state for roles
  const [error, setError] = useState(null); // Error state for roles

  useEffect(() => {
    const fetchRoles = async () => {
      setLoadingRoles(true); // Start loading
      try {
        const response = await fetch(`https://api.premiumplatforming.com/roles`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched roles:", data); // Log the fetched data
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setError(error.message);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  // Handle loading state
  if (status === "loading" || loadingRoles) {
    return <div className="text-white">Loading...</div>; // Loading indicator
  }

  // Handle error state
  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Error message
  }

  return (
    <div className="bg-black text-white min-h-screen relative">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Premium Platforming</span>
              <img
                alt="Premium Platforming"
                src="https://us-east-1.tixte.net/uploads/us.orbit.tf/Premium_Platforming_LOGO_WHITE.png"
                className="h-14 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img
                    src={session.user.image || "/fallback-image.png"} // Fallback image if user image is not available
                    alt="User Profile"
                    className="h-9 w-9 rounded-full cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-white"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Premium Platforming</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {session ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <img
                          src={session.user.image || "/fallback-image.png"} // Fallback image
                          alt="User Profile"
                          className="h-8 w-8 rounded-full"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut()}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Background Pattern */}
      <div className="relative isolate px-6 pt-6 lg:px-8">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.9}
          duration={2}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />

        {/* Main Content */}
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32 relative z-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-6xl">
            Premium Platforming Staff
          </h1>
        </div>

        {/* Staff Roles List */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-950">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Avatar
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Display Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Roles
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-950 divide-y divide-gray-700">
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <img
                      src={role.avatar || "/fallback-avatar.png"}
                      alt={`${role.displayName}'s avatar`}
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                    {role.displayName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex flex-wrap space-x-1">
                      {role.roles.map((r) => (
                        <span
                          key={r.id}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-white rounded-full"
                          style={{ backgroundColor: r.color }} // Assuming each role has a color property
                        >
                          {r.name}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
