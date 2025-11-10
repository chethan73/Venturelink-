'use client';

import { motion } from 'framer-motion';
import { FaUserCog, FaLock, FaRegEnvelope, FaBell } from 'react-icons/fa';

const settingsOptions = [
  {
    id: 1,
    name: 'User Management',
    description: 'Manage users and their roles within the platform.',
    icon: <FaUserCog className="text-indigo-600" />,
  },
  {
    id: 2,
    name: 'Security Settings',
    description: 'Control platform security settings, including password policies and 2FA.',
    icon: <FaLock className="text-red-500" />,
  },
  {
    id: 3,
    name: 'Email Notifications',
    description: 'Set preferences for email notifications and alerts.',
    icon: <FaRegEnvelope className="text-blue-500" />,
  },
  {
    id: 4,
    name: 'Notification Settings',
    description: 'Configure push notifications and alert preferences.',
    icon: <FaBell className="text-yellow-500" />,
  },
];

const SettingsCard = ({ setting }: { setting: typeof settingsOptions[0] }) => {
  return (
    <motion.div
      className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3">
        {setting.icon}
        <h3 className="text-lg font-semibold text-gray-800">{setting.name}</h3>
      </div>
      <p className="text-sm text-gray-600 mt-2">{setting.description}</p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 text-indigo-600 cursor-pointer"
      >
        Go to Settings
      </motion.div>
    </motion.div>
  );
};

const AdminSettings = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsOptions.map((setting) => (
          <SettingsCard key={setting.id} setting={setting} />
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;
