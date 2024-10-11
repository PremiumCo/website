// pages/index.js
"use client"
import Head from 'next/head';
import ThreeScene from '../components/ThreeScene';

const Home = () => {
  return (
    <>
      <Head>
        <title>Three.js with Next.js</title>
        <meta name="description" content="Three.js and Next.js integration example" />
      </Head>
      <main>
        <h1>Welcome to Three.js with Next.js!</h1>
        <ThreeScene />
      </main>
    </>
  );
};

export default Home;
