'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';

const colors = ['#10B981', '#6366F1', '#F59E0B', '#EF4444', '#3B82F6'];

const FundingScoresPage = () => {
  const [startups, setStartups] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('All');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch('http://localhost:8000/funding-scores');
        const data = await res.json();
        setStartups(data.startups || []);
        setInvestors(data.investors || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  const filtered = (items) => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterSector === 'All' || item.sector === filterSector)
    );
  };

  const ChartSection = ({ title, data, keyLabel }) => (
    <motion.div 
      className="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">{title} Score Distribution</h3>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{
            backgroundColor: keyLabel === 'Investor' ? '#6366F1' : '#10B981'
          }}></span>
          <span className="text-sm text-gray-500">Average: {
            (data.reduce((sum, item) => sum + item.score, 0) / data.length).toFixed(1)
          }</span>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis 
              dataKey="name" 
              angle={-30} 
              textAnchor="end" 
              height={60}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              domain={[0, 10]} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '12px'
              }}
              itemStyle={{
                color: '#111827',
                fontSize: '14px'
              }}
              labelStyle={{
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}
            />
            <Bar 
              dataKey="score" 
              fill={keyLabel === 'Investor' ? '#6366F1' : '#10B981'} 
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  const DistributionChart = ({ title, data, type }) => (
    <motion.div 
      className="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{title} {type} Distribution</h3>
      <div className="h-64 flex items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.reduce((acc, cur) => {
                const found = acc.find(item => item.name === cur[type]);
                if (found) found.value += 1;
                else acc.push({ name: cur[type], value: 1 });
                return acc;
              }, [])}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={60}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell 
                  key={index} 
                  fill={colors[index % colors.length]} 
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`Count: ${value}`, '']}
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  const FeedbackCard = ({ item }) => (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-indigo-100 group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
              {item.category}
            </span>
            <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
              {item.sector}
            </span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
          item.score >= 8 ? 'bg-green-50 text-green-700' :
          item.score >= 5 ? 'bg-yellow-50 text-yellow-700' :
          'bg-red-50 text-red-700'
        }`}>
          {item.score}/10
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
          <span>Funding Need</span>
          <span className="font-medium text-gray-700">{item.funding_need}</span>
        </div>
        
        <div className="mt-4">
          <p className={`text-sm p-3 rounded-lg ${
            item.feedback.includes('excellent') ? 'bg-green-50 text-green-700' :
            item.feedback.includes('improve') ? 'bg-yellow-50 text-yellow-700' :
            'bg-gray-50 text-gray-700'
          }`}>
            {item.feedback}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            AI-Powered Funding Score Dashboard
          </span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Advanced analytics for startup funding potential and investor matching
        </p>
      </motion.div>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition"
          />
          <svg 
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="w-full sm:w-48 relative">
          <select 
            value={filterSector} 
            onChange={(e) => setFilterSector(e.target.value)} 
            className="w-full p-3 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition bg-white appearance-none"
          >
            <option value="All">All Sectors</option>
            <option value="Startup">Startups Only</option>
            <option value="Investor">Investors Only</option>
          </select>
          <svg 
            className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <section className="mb-16">
            <motion.div 
              className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900">Startups</h2>
              <span className="text-sm text-gray-500">
                Showing {filtered(startups).length} of {startups.length} startups
              </span>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <ChartSection title="Startups" data={filtered(startups)} keyLabel="Startup" />
              <DistributionChart title="Startup" data={startups} type="category" />
            </div>
            
            <motion.h3 
              className="text-xl font-semibold text-gray-800 mt-12 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Startup Details
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered(startups).map(item => (
                <FeedbackCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          <section>
            <motion.div 
              className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900">Investors</h2>
              <span className="text-sm text-gray-500">
                Showing {filtered(investors).length} of {investors.length} investors
              </span>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <ChartSection title="Investors" data={filtered(investors)} keyLabel="Investor" />
              <DistributionChart title="Investor" data={investors} type="sector" />
            </div>
            
            <motion.h3 
              className="text-xl font-semibold text-gray-800 mt-12 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Investor Details
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered(investors).map(item => (
                <FeedbackCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default FundingScoresPage;