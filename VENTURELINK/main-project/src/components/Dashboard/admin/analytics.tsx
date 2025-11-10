'use client';
import React, { useState, useEffect } from 'react';
import { FaUsers, FaUserCheck, FaProjectDiagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Define types for analytics data
interface RoleBreakdown {
  role: string;
  count: number;
}

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  roleBreakdown: RoleBreakdown[];
}

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getanalytics');
        if (!response.ok) {
          throw new Error(`Error fetching analytics: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched Analytics Data:", data); // Debugging Log

        // Ensure numerical values are extracted correctly
        const fixedData: Analytics = {
          totalUsers: Array.isArray(data.totalUsers) ? data.totalUsers.length : data.totalUsers,
          activeUsers: data.activeUsers ?? 0,
          totalProjects: Array.isArray(data.totalProjects) ? data.totalProjects.length : data.totalProjects,
          roleBreakdown: Array.isArray(data.roleBreakdown) ? data.roleBreakdown : [],
        };

        setAnalytics(fixedData);
        setLoading(false);
      } catch (error: any) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading analytics...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard - Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={<FaUsers className="text-indigo-500 w-8 h-8" />} title="Total Users" value={analytics.totalUsers} color="bg-indigo-100" />
        <StatCard icon={<FaUserCheck className="text-green-500 w-8 h-8" />} title="Active Users" value={analytics.activeUsers} color="bg-green-100" />
        <StatCard icon={<FaProjectDiagram className="text-blue-500 w-8 h-8" />} title="Total Projects" value={analytics.totalProjects} color="bg-blue-100" />
      </div>

      {/* Role Breakdown */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">User Role Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {analytics.roleBreakdown.map((role, index) => (
            <motion.div
              key={index}
              className={`p-6 bg-white shadow-lg rounded-lg ${getRoleColor(role.role)} hover:shadow-xl transition-shadow duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-xl">{role.role}</h4>
              <p className="text-gray-500">{role.count} Users</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to return dynamic colors for different roles
const getRoleColor = (role: string) => {
  switch (role) {
    case 'Admin':
      return 'bg-yellow-100 text-yellow-600';
    case 'User':
      return 'bg-gray-100 text-gray-600';
    case 'Moderator':
      return 'bg-purple-100 text-purple-600';
    default:
      return 'bg-blue-100 text-blue-600';
  }
};

// 📌 **Reusable StatCard Component with Animation**
const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: number; color: string }) => (
  <motion.div
    className={`p-6 shadow-md rounded-lg flex items-center space-x-4 ${color} hover:scale-105 transition-transform duration-300`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    {icon}
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500">{value}</p>
    </div>
  </motion.div>
);

export default AdminAnalytics;
