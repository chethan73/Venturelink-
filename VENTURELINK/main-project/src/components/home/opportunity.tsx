// app/blog/investment-opportunity.tsx
'use client'; // Ensures this is a client-side component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct for App Router
import { FaArrowLeft } from 'react-icons/fa'; // Back button icon
import { motion } from 'framer-motion'; // For animations
import Link from 'next/link';


const InvestmentOpportunity = () => {
  const router = useRouter();
  
  // State for smooth scroll animation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger scroll fade-in effect
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

  const blogPost = {
    title: 'New Investment Opportunities',
    date: 'February 5, 2025',
    author: 'John Doe',
    content: `
      Discover exciting new investment opportunities on our platform. Stay ahead of the curve with a deep dive into some of the most promising sectors and industries.
      Whether you're interested in AI, sustainable energy, or blockchain, our platform helps you identify high-potential startups to back.

      We highlight the following sectors:
      1. **AI & Machine Learning**: Revolutionizing every industry, from healthcare to finance.
      2. **Sustainable Energy**: Green technologies and initiatives for a cleaner tomorrow.
      3. **Blockchain & Cryptocurrency**: The future of decentralized finance.
      4. **Healthcare Innovations**: Revolutionizing health with new biotech solutions.

      Make sure to explore these opportunities on our platform and make your investments count!
    `,
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-indigo-100 min-h-screen py-10 px-6">
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

      {/* Blog Content */}
      <motion.div 
        className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">{blogPost.title}</h1>
        <p className="text-center text-gray-600 mb-6">Published on {blogPost.date} by {blogPost.author}</p>
        
        <div className={`text-lg text-gray-700 leading-relaxed ${isVisible ? 'opacity-100' : 'opacity-50'} transition-opacity duration-500`}>
          {blogPost.content}
        </div>
      </motion.div>
    </div>
  );
};

export default InvestmentOpportunity;
