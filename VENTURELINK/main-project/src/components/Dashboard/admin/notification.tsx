'use client';

import React, { useState, useEffect } from "react";
import { Bell, AlertCircle, Loader, Clock, Lock, Unlock } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  full_name: string;
  email: string;
  message: string;
  timestamp: string;
  blocked: boolean;
}
const Notifications = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // const [error, setError] = useState<string>("");

  // Fetch messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/getall-support"); // ✅ Ensure correct backend API route
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Failed to fetch messages");

        setMessages(data.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Toggle Block/Unblock status (Same logic from AdminUsers.tsx)
  const toggleBlockUser = async (userId: number, isBlocked: boolean) => {
    try {
      const confirmAction = window.confirm(
        isBlocked ? "Are you sure you want to unblock this user?" : "Are you sure you want to block this user?"
      );
      if (!confirmAction) return;

      const response = await fetch(`/api/users/blockUser/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to update block status");

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === userId ? { ...msg, blocked: !isBlocked } : msg
        )
      );
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Bell className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-bold text-slate-800">Notifications</h2>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
          {loading ? (
            <div className="flex justify-center items-center h-60">
              <Loader className="animate-spin text-blue-500 w-10 h-10" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : messages.length > 0 ? (
            <div className="grid gap-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className="group flex flex-col md:flex-row items-start gap-4 bg-white p-4 rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Notification Icon */}
                  <AlertCircle className="w-6 h-6 text-red-500" />

                  {/* Message Content */}
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium">{message.message}</p>
                    <p className="text-slate-600">{message.full_name} (<span className="text-blue-500">{message.email}</span>)</p>
                    <div className="text-sm text-slate-500 flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </div>

                  <button 
                    // onClick={() => setIsLogin(false)}
                    onClick={() => router.push(`/admin/users`)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    User Management
                  </button>

                  {/* Block/Unblock Button with Icon */}
                  {/* <motion.button
                    onClick={() => toggleBlockUser(message.id, message.blocked)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
                      message.blocked
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    {message.blocked ? (
                      <>
                        <Unlock className="w-4 h-4" /> Unblock
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Block
                      </>
                    )}
                  </motion.button> */}
                  {/* <motion.button
                          className={`px-3 py-1 rounded-lg ${
                            message.blocked ? "bg-red-600" : "bg-white text-indigo-700"
                          }`}
                          onClick={() => toggleBlockUser(message.id, message.blocked)}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          {message.blocked ? "Unblock" : "Block"}
                        </motion.button> */}
                      {/* </div>
                    </motion.div> */}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <AlertCircle className="w-16 h-16 text-slate-400 animate-pulse mx-auto mb-4" />
              <p className="text-slate-600 font-medium">No notifications</p>
              <p className="text-slate-400 text-sm mt-1">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
