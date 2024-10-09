"use client"; // This makes the component a Client Component

import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion"; // Import framer-motion

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Define animation variants
const variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -50,
  },
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AnimatePresence mode="wait"> {/* Ensure proper exit before entering */}
            <motion.div
              key={children.key} // Use a unique key to trigger reanimation
              initial="initial"
              animate="enter"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }} // Adjust duration as needed
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </body>
      </html>
    </SessionProvider>
  );
}
