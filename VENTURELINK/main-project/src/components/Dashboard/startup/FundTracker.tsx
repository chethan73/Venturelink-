'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaWallet, FaChartLine } from 'react-icons/fa';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

const FundTracking = () => {
  const [funds, setFunds] = useState({
    totalRaised: 100000, // Example total raised
    totalSpent: 35000,   // Example total spent
    target: 150000       // Target funding goal
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '2024-01-10', description: 'Seed Investment', amount: 50000, type: 'income' },
    { id: 2, date: '2024-02-15', description: 'Marketing Campaign', amount: 10000, type: 'expense' },
    { id: 3, date: '2024-03-05', description: 'Product Development', amount: 15000, type: 'expense' },
    { id: 4, date: '2024-04-12', description: 'Series A Funding', amount: 50000, type: 'income' },
  ]);

  const remainingFunds = funds.totalRaised - funds.totalSpent;
  const progressPercentage = (funds.totalRaised / funds.target) * 100;

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-8 px-4 sm:px-12">
      <motion.h1 
        className="text-4xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🚀 Startup Fund Tracking Dashboard
      </motion.h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <FaWallet className="text-4xl text-green-500 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Total Funds Raised</h3>
          <p className="text-2xl font-bold text-green-600">${funds.totalRaised.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <FaArrowDown className="text-4xl text-red-500 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Total Funds Spent</h3>
          <p className="text-2xl font-bold text-red-600">-${funds.totalSpent.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <FaChartLine className="text-4xl text-blue-500 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Remaining Funds</h3>
          <p className="text-2xl font-bold text-blue-600">${remainingFunds.toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Funding Progress</h2>
        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.2 }}
          ></motion.div>
        </div>
        <p className="mt-2 text-sm text-gray-600">{progressPercentage.toFixed(2)}% of target achieved</p>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>
        <ul className="space-y-4">
          {transactions.map((txn) => (
            <motion.li 
              key={txn.id} 
              className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-4">
                {txn.type === 'income' ? (
                  <FaArrowUp className="text-green-500 text-xl" />
                ) : (
                  <FaArrowDown className="text-red-500 text-xl" />
                )}
                <div>
                  <p className="text-gray-700 font-medium">{txn.description}</p>
                  <p className="text-gray-500 text-sm">{txn.date}</p>
                </div>
              </div>
              <p className={`text-lg font-bold ${txn.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {txn.type === 'income' ? '+' : '-'}${txn.amount.toLocaleString()}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default FundTracking;
