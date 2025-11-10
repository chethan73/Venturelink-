"use client";

import React, { useState, useEffect } from "react";
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  number: string;
  sector: string;
  blocked: boolean;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/getall");
        if (!response.ok) throw new Error(`Error fetching users: ${response.statusText}`);

        const data = await response.json();
        if (Array.isArray(data.data)) {
          setUsers(
            data.data.sort((a: User, b: User) => a.full_name.localeCompare(b.full_name))
          );
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleBlockUser = async (userId: number, isBlocked: boolean) => {
    try {
      const confirmBlock = window.confirm(
        isBlocked
          ? "Are you sure you want to unblock this user?"
          : "Are you sure you want to block this user?"
      );
      if (!confirmBlock) return;

      const response = await fetch(`/api/users/blockUser/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to update block status");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, blocked: !isBlocked } : user
        )
      );
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const investors = filteredUsers.filter((user) => user.role === "Investor");
  const startups = filteredUsers.filter((user) => user.role === "Startup");

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6">User Management</h2>

      {/* Search Bar */}
      <motion.div
        className="mb-6 flex justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </motion.div>

      {loading ? (
        <div className="text-center text-gray-500">Loading users...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Investors */}
          <div className="border-r border-gray-300 pr-6">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Investors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {investors.length > 0 ? (
                investors.map((user) => (
                  <UserCard key={user.id} user={user} type="Investor" toggleBlockUser={toggleBlockUser} />
                ))
              ) : (
                <p className="text-gray-500">No investors found.</p>
              )}
            </div>
          </div>

          {/* Startups */}
          <div className="pl-6">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">Startups</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {startups.length > 0 ? (
                startups.map((user) => (
                  <UserCard key={user.id} user={user} type="Startup" toggleBlockUser={toggleBlockUser} />
                ))
              ) : (
                <p className="text-gray-500">No startups found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// User Card Component
const UserCard = ({
  user,
  type,
  toggleBlockUser,
}: {
  user: User;
  type: "Investor" | "Startup";
  toggleBlockUser: (id: number, isBlocked: boolean) => void;
}) => (
  <motion.div
    className={`p-6 shadow-lg rounded-xl text-white hover:scale-105 transition-transform duration-300 ${
      type === "Investor"
        ? "bg-gradient-to-r from-blue-500 to-indigo-600"
        : "bg-gradient-to-r from-green-400 to-teal-500"
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-lg font-bold">{user.full_name}</h3>
    <p className="text-sm">{user.email}</p>
    <p className="text-sm">Sector: {user.sector || "N/A"}</p>

    <div className="mt-4 flex justify-between">
      <button className="flex items-center space-x-2 text-white hover:underline">
        <FaPhoneAlt className="w-5 h-5" />
        <span>{user.number || "No number"}</span>
      </button>

      <motion.button
        className={`px-3 py-1 rounded-lg ${
          user.blocked ? "bg-red-600" : "bg-white text-indigo-700"
        }`}
        onClick={() => toggleBlockUser(user.id, user.blocked)}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        {user.blocked ? "Unblock" : "Block"}
      </motion.button>
    </div>
  </motion.div>
);

export default AdminUsers;
