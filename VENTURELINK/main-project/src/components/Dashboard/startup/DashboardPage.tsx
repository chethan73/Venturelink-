'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRocket, FaBullhorn, FaHandHoldingUsd, FaChartLine, FaLightbulb } from 'react-icons/fa';
import { Users2 } from 'lucide-react';

const StartupDashboard = () => {
  const [user, setUser] = useState<any | null>(null);
  const [fieldsInDemand, setFieldsInDemand] = useState<string[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userData = localStorage.getItem('users2') ? JSON.parse(localStorage.getItem('users2') ?? '') : null;
    const trendingFields = ['AI & Machine Learning', 'Blockchain Technology', 'Healthcare Innovations', 'Sustainable Energy', 'FinTech'];
    const investmentTips = [
      'Consider investing in AI-driven solutions, as they are leading the market.',
      'Blockchain is revolutionizing the finance sector. Get involved early.',
      'Healthcare innovations are attracting significant attention, especially post-pandemic.',
      'Sustainable energy is a long-term growth area. Explore clean energy projects.',
    ];

    setUser(userData);
    setFieldsInDemand(trendingFields);
    setTips(investmentTips);
    setLoading(false);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Startup Portal
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Strategic Investment Dashboard
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {currentDate}
          </motion.p>
        </motion.header>

        {/* Welcome Section */}
        <motion.section
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {loading ? (
            <div className="h-8 w-64 mx-auto bg-gray-200 rounded-full animate-pulse"></div>
          ) : (
            <div className="inline-block bg-white px-6 py-4 rounded-full shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome back, <span className="text-indigo-600">{Users2?.full_name || 'Startup'}</span>!
              </h2>
            </div>
          )}
        </motion.section>

        {/* Fields In Demand Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center mb-4">
              <FaChartLine className="text-indigo-600 text-3xl mr-3" />
              <h3 className="text-3xl font-bold text-gray-900">Emerging Investment Sectors</h3>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl text-center">
              High-growth industries currently attracting significant capital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fieldsInDemand.map((field, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <FaArrowRight className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{field}</h4>
                    <p className="text-gray-600">Projected growth: {Math.floor(Math.random() * 20) + 10}% YoY</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Investor Tips Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center mb-4">
              <FaLightbulb className="text-yellow-500 text-3xl mr-3" />
              <h3 className="text-3xl font-bold text-gray-900">Expert Insights</h3>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl text-center">
              Actionable recommendations from our investment strategists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index + 0.2 }}
              >
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                    <FaRocket className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Strategy #{index + 1}</h4>
                    <p className="text-gray-600">{tip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to take action?</h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Explore our gamified investment platform to discover curated opportunities matching your portfolio strategy
            </p>
            <motion.a
              href="/investor/gamification"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBullhorn className="mr-3 text-xl" />
              Launch Investment Explorer
            </motion.a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default StartupDashboard;