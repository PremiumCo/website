// pages/index.js
"use client";
import Head from 'next/head';
import AnimatedGridPattern from "../components/ui/animated-grid-pattern";
import { cn } from "../lib/utils";

const Home = () => {
  return (
    <>
      <Head>
        <title>Three.js with Next.js</title>
        <meta name="description" content="Three.js and Next.js integration example" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-black">
        <h1 className="text-6xl text-white font-bold mb-4 drop-shadow-lg">Under Construction</h1>
        <h2 className="text-2xl text-white mb-8 drop-shadow-md">We’re building something awesome!</h2>
        <h2 className="text-2xl text-white mb-8 drop-shadow-md">(Mike is sweeping for us)</h2>
        <img
          className="max-w-md h-auto rounded-lg shadow-lg transform transition-transform hover:scale-105"
          src="https://cdn.discordapp.com/attachments/1292638781740159078/1293841989560696863/image.png?ex=67098080&is=67082f00&hm=155d9694ab4ad7f7d32d15268a40f61f1804eb619fcfd701e341b65e1466225c&"
          alt="Centered Image"
        />
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
        <p className="mt-8 text-lg text-white text-center">Stay tuned for updates!</p>
        <footer className="py-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-md text-gray-400">
              &copy; {new Date().getFullYear()} Premium Platforming. All rights
              reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Home;
