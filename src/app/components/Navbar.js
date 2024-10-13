// components/Navbar.js

import Image from "next/image";
import logo from "../public/logo.png"; // Adjust the path as necessary
import { signOut, signIn } from "next-auth/react";

const Navbar = ({ session }) => {
    return (
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Premium Platforming</span>
                    <Image alt="Premium Platforming" src={logo} className="h-14 w-auto" />
                </a>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
                <a href="/" className="text-sm font-semibold leading-6 text-white">Home</a>
                <a href="/admin" className="text-sm font-semibold leading-6 text-white">Admin</a>
                {/* Add more links as needed */}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {session ? (
                    <button onClick={signOut} className="text-sm font-semibold leading-6 text-white">
                        Log out
                    </button>
                ) : (
                    <button onClick={() => signIn("discord")} className="text-sm font-semibold leading-6 text-white">
                        Log in
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
