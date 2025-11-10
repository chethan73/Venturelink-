'use client'; // This marks the component as a Client Component

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaBuilding, FaUsers, FaLink } from 'react-icons/fa'; // Icons

const ExplorePartnerships = () => {
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate fetching partnership data
  useEffect(() => {
    // Sample data for strategic partnerships
    const partnershipsData = [
      { name: 'Tech Innovators', industry: 'Technology', description: 'A leading tech company specializing in AI solutions.', contact: 'info@techinnovators.com' },
      { name: 'Green Future', industry: 'Sustainable Energy', description: 'A startup focused on creating green energy solutions for businesses.', contact: 'contact@greenfuture.com' },
      { name: 'HealthPartners', industry: 'Healthcare', description: 'A network of healthcare providers offering innovative solutions.', contact: 'hello@healthpartners.com' },
    ];

    setPartnerships(partnershipsData);
    setLoading(false);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-indigo-100 min-h-screen py-8 px-4">
      {/* Header Section */}
      <motion.header
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-semibold tracking-wide text-gray-800"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Explore Strategic Partnerships
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-600"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Find potential partners for your startup and grow together.
        </motion.p>
      </motion.header>

      {/* Partnerships List Section */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {loading ? (
          <p className="text-xl text-gray-500">Loading partnerships...</p>
        ) : (
          partnerships.map((partnership, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-4">
                <FaBuilding className="text-indigo-600 text-2xl" />
                <span className="text-xl font-semibold text-gray-800">{partnership.name}</span>
              </div>
              <p className="text-md text-gray-600">{partnership.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">{partnership.industry}</span>
                <a
                  href={`mailto:${partnership.contact}`}
                  className="inline-flex items-center text-indigo-600 font-semibold"
                >
                  <FaLink className="mr-2 text-xl" />
                  Contact Now
                </a>
              </div>
            </motion.div>
          ))
        )}
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <a
          href="/startup/partnerships/request"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          <FaHandshake className="mr-2 text-xl" />
          Request a Partnership
        </a>
      </motion.section>
    </div>
  );
};

export default ExplorePartnerships;
