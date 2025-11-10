// app/blog/latest-blog-news.tsx
'use client'; // Ensures this is a client-side component

import React from 'react';
import { useRouter } from 'next/navigation'; // Correct for App Router
import { FaArrowLeft } from 'react-icons/fa'; // Back button icon
import { motion } from 'framer-motion'; // For animations
import Link from 'next/link';


const LatestBlogAndNews = () => {
  const router = useRouter();

  // Data for Latest Blog Posts
  const blogPosts = [
    {
      title: 'Tech Innovations in Investment',
      excerpt: `
        Explore how emerging technologies like AI, blockchain, and big data are shaping the investment landscape. 
        Learn about new trends and how they can benefit investors.
      `,
      date: 'February 5, 2025',
      author: 'John Doe',
      link: '/home/Tech',
    },
    {
      title: 'Startup Success Stories',
      excerpt: `
        Discover inspiring stories of successful startups that have raised capital and achieved exponential growth. 
        Read about their journey and the challenges they overcame.
      `,
      date: 'February 3, 2025',
      author: 'Jane Smith',
      link: '/home/stories',
    },
    {
      title: 'Investment Opportunities in 2025',
      excerpt: `
        Learn about the most promising investment opportunities in various sectors including AI, sustainable energy, 
        and healthcare. Explore where investors should focus their attention this year.
      `,
      date: 'January 29, 2025',
      author: 'Michael Johnson',
      link: '/home/opportunity',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-indigo-100 min-h-screen py-10 px-6">
      {/* Back to Blog Listing */}
      <Link href="/">
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
          <span className="font-semibold">Back to Blog </span>
        </button>
      </motion.div>
      </Link>

      {/* Latest Blog Posts */}
      <motion.div
        className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-xl space-y-8"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Latest Blog and News</h1>

        {/* Blog Post Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                <p className="text-gray-600 text-sm">Published on {post.date} by {post.author}</p>
                <p className="text-gray-500 mt-2">{post.excerpt}</p>
                <button
                  onClick={() => router.push(post.link)}
                  className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LatestBlogAndNews;
