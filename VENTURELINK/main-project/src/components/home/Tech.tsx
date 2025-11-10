// app/blog/tech-innovations-in-investment.tsx
'use client'; // Ensures this is a client-side component

import React from 'react';
import { useRouter } from 'next/navigation'; // Correct for App Router
import { FaArrowLeft } from 'react-icons/fa'; // Back button icon
import { motion } from 'framer-motion'; // For animations
import Link from 'next/link';


const TechInnovationsInInvestment = () => {
  const router = useRouter();

  // Data about tech innovations in investment
  const innovations = [
    {
      title: 'AI & Machine Learning',
      description: `
        AI and Machine Learning are transforming the investment space by providing advanced data analytics, 
        predictive models, and personalized recommendations for investors. These technologies enhance decision-making 
        and improve investment strategies.
      `,
      icon: 'https://via.placeholder.com/50x50', // Placeholder for icon
    },
    {
      title: 'Blockchain & Cryptocurrency',
      description: `
        Blockchain is revolutionizing how investments are tracked, secured, and exchanged. 
        It provides transparency and reduces fraud. Cryptocurrencies are also emerging as alternative investment 
        assets, reshaping the financial world.
      `,
      icon: 'https://via.placeholder.com/50x50', // Placeholder for icon
    },
    {
      title: 'Automated Trading Systems',
      description: `
        Automated trading systems use algorithms to execute trades based on predefined criteria, 
        reducing human error and increasing speed. They can also identify profitable opportunities 
        that may be missed by traditional methods.
      `,
      icon: 'https://via.placeholder.com/50x50', // Placeholder for icon
    },
    {
      title: 'Big Data Analytics',
      description: `
        Big Data Analytics helps investors process massive amounts of market data to uncover trends, 
        opportunities, and potential risks. With real-time insights, investors can make more informed decisions 
        and predict market movements more accurately.
      `,
      icon: 'https://via.placeholder.com/50x50', // Placeholder for icon
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-indigo-100 min-h-screen py-10 px-6">
      {/* Back to blog list */}
      <Link href="/home/News">

      <motion.div 
        className="mb-8"
        whileHover={{ scale: 1.1 }} 
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <button
          onClick={() => router.push('/blog')}
          className="text-blue-500 hover:text-blue-700 inline-flex items-center transition-all duration-300"
        >
          <FaArrowLeft className="mr-2" />
          <span className="font-semibold">Back to Latest Blog and News</span>
        </button>
      </motion.div>
      </Link>

      {/* Tech Innovations */}
      <motion.div
        className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-xl space-y-8"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Tech Innovations in Investment</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovations.map((innovation, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="p-6 flex items-center space-x-4">
                <img src={innovation.icon} alt={innovation.title} className="w-12 h-12" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{innovation.title}</h2>
                  <p className="text-gray-500 text-sm mt-2">Discover how {innovation.title} is changing the world of investment.</p>
                  <p className="text-gray-700 mt-4">{innovation.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechInnovationsInInvestment;
