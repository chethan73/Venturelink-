// app/blog/startup-success-stories.tsx
'use client'; // Ensures this is a client-side component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct for App Router
import { FaArrowLeft } from 'react-icons/fa'; // Back button icon
import { motion } from 'framer-motion'; // For animations
import Link from 'next/link';


const StartupSuccessStories = () => {
  const router = useRouter();
  
  // State for scroll fade-in effect
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Success story data
  const stories = [
    {
      title: 'TechStartupX: Revolutionizing Healthcare',
      author: 'Jane Doe',
      date: 'January 20, 2025',
      content: `
        TechStartupX has made incredible strides in the healthcare space with its cutting-edge AI solutions for diagnosing diseases early. 
        Their platform has helped thousands of people receive life-saving treatments.
      `,
      image: 'https://via.placeholder.com/600x400',
    },
    {
      title: 'EcoEnergy: Green Tech for a Sustainable Future',
      author: 'David Smith',
      date: 'February 1, 2025',
      content: `
        EcoEnergy’s breakthrough in solar energy storage has enabled a more sustainable future for thousands of communities. 
        Their innovative technology continues to drive the green revolution forward.
      `,
      image: 'https://via.placeholder.com/600x400',
    },
    {
      title: 'CryptoSecure: Leading the Blockchain Security Race',
      author: 'Samantha Lee',
      date: 'February 10, 2025',
      content: `
        CryptoSecure has become a leader in blockchain security, offering an advanced encryption system for decentralized apps. 
        Their solutions are trusted by top financial institutions and tech companies worldwide.
      `,
      image: 'https://via.placeholder.com/600x400',
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

      {/* Success Stories */}
      <motion.div
        className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-xl space-y-8"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Startup Success Stories</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">{story.title}</h2>
                <p className="text-gray-500 text-sm mt-2">{story.date} | By {story.author}</p>
                <p className="text-gray-700 mt-4">{story.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StartupSuccessStories;
