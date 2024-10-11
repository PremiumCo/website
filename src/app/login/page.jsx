// src/app/login/page.js
"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  const handleLogin = async () => {
    try {
      await signIn("discord");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Login
        </h1>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover-bg-blue-900"
        >
          Sign in with Discord
        </button>
      </div>
    </div>
  );
}
