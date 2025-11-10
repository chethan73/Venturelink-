'use client';

import React, { useEffect, useState } from 'react';
// import { fetchInvestorProfile, updateInvestorProfile } from '@/utils/api';
import { motion } from 'framer-motion';
import { User, Mail, Layers, Save, Lock, Bell } from 'lucide-react';

const investorId = '123'; // Replace with dynamic investor ID

const SettingsForm = ({ activeTab }: { activeTab: 'profile' | 'password' | 'notifications' }) => {
  const [formData, setFormData] = useState({ name: '', email: '', sectors: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [notificationSettings, setNotificationSettings] = useState({ email: true, sms: false, push: true });

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await fetchInvestorProfile(investorId);
      setFormData(profile);
    };
    loadProfile();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (type: string) => {
    setNotificationSettings((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    if (activeTab === 'profile') {
      await updateInvestorProfile({ ...formData, investorId });
    } else if (activeTab === 'password') {
      // Password update logic here
      console.log('Password Data:', passwordData);
    } else if (activeTab === 'notifications') {
      // Notification settings update logic here
      console.log('Notification Settings:', notificationSettings);
    }
    setIsSaving(false);
    alert('Changes saved successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600"> Settings Form </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'profile' && (
          <>
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-3">
              <User className="text-blue-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleProfileChange}
                placeholder="Full Name"
                className="border rounded-xl p-2 w-full focus:ring-2 focus:ring-blue-400"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-3">
              <Mail className="text-green-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleProfileChange}
                placeholder="Email Address"
                className="border rounded-xl p-2 w-full focus:ring-2 focus:ring-green-400"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-3">
              <Layers className="text-purple-500" />
              <select
                name="sectors"
                value={formData.sectors}
                onChange={handleProfileChange}
                className="border rounded-xl p-2 w-full focus:ring-2 focus:ring-purple-400"
                required
              >
                <option value="">Select Sector</option>
                <option value="IT">IT</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </select>
            </motion.div>
          </>
        )}

        {activeTab === 'password' && (
          <>
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-3">
              <Lock className="text-red-500" />
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Current Password"
                className="border rounded-xl p-2 w-full focus:ring-2 focus:ring-red-400"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-3">
              <Lock className="text-yellow-500" />
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="border rounded-xl p-2 w-full focus:ring-2 focus:ring-yellow-400"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-3">
              <Lock className="text-green-500" />
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
                className="border rounded-xl p-2 w-full focus:ring-2 focus:ring-green-400"
                required
              />
            </motion.div>
          </>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Bell className="text-blue-500" /> <span>Email Notifications</span>
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.email}
                onChange={() => handleNotificationToggle('email')}
                className="h-5 w-5 text-blue-500 focus:ring-blue-400"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Bell className="text-green-500" /> <span>SMS Notifications</span>
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.sms}
                onChange={() => handleNotificationToggle('sms')}
                className="h-5 w-5 text-green-500 focus:ring-green-400"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Bell className="text-purple-500" /> <span>Push Notifications</span>
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.push}
                onChange={() => handleNotificationToggle('push')}
                className="h-5 w-5 text-purple-500 focus:ring-purple-400"
              />
            </motion.div>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className={`flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-xl w-full shadow-md transition duration-300 ${
            isSaving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSaving}
        >
          <Save /> {isSaving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SettingsForm;
