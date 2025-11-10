// "use client"; // Mark this file as client-side

// import React, { useState } from 'react';
// import Navbar from './Navbar'; // Ensure this component exists
// // import TopBar from './TopBar'; // Uncomment if TopBar is needed
// import InvestorDashboard from './InvestorDashboard'; // Ensure this component exists
// import StartupDashboard from './StartupDashboard'; // Ensure this component exists
// // import DashboardWidgets from './DashboardWidgets'; // Uncomment if widgets are needed
// import MainContent from './MainContent'; // Ensure this component exists

// const Dashboard = () => {
//   const [userRole, setUserRole] = useState<'investor' | 'startup'>('investor'); // Set the initial role dynamically

//   // Optional: Toggle the user role, could be replaced with real authentication data
//   const toggleRole = () => {
//     setUserRole((prevRole) => (prevRole === 'investor' ? 'startup' : 'investor'));
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Navbar component */}
//       <Navbar />

//       <div className="flex-1 overflow-y-auto">
//         {/* Optional: TopBar component if needed */}
//         {/* <TopBar /> */}

//         {/* Conditional Rendering based on User Role */}
//         {userRole === 'investor' ? <InvestorDashboard /> : <StartupDashboard />}

//         {/* Optional Widgets */}
//         {/* <DashboardWidgets /> */}

//         {/* Main Content */}
//         <MainContent />

//         {/* Optional Button to toggle between roles */}
//         <button
//           onClick={toggleRole}
//           className="fixed bottom-10 right-10 bg-indigo-600 text-white p-4 rounded-full"
//         >
//           Toggle Role
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// // Import necessary dependencies
// import { useState } from 'react';
// import { Bell, LogOut, User, BarChart, MessageCircle } from 'lucide-react';
// import { motion } from 'framer-motion';

// // Tailwind styles for the layout
// const layoutStyles = `min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100`;
// const navStyles = `w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center py-6`;
// const contentStyles = `flex-1 flex flex-col`;
// const topbarStyles = `w-full bg-white dark:bg-gray-800 px-6 py-4 flex justify-between items-center shadow`;

// // Navbar Component
// const navItems = [
//   { name: 'Dashboard', icon: <BarChart />, link: '#' },
//   { name: 'Messages', icon: <MessageCircle />, link: '#' },
//   { name: 'Profile', icon: <User />, link: '#' },
// ];

// const Topbar = () => (
//   <div className="topbar">
//     <div>
//       <h2 className="text-lg font-semibold">Welcome, Investor!</h2>
//     </div>
//     <div className="flex items-center space-x-4">
//       <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//         <Bell className="text-xl" />
//       </button>
//       <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//         <LogOut className="text-xl" />
//       </button>
//     </div>
//   </div>
// );


// // Topbar Component
// const Topbar = () => {
//   return (
//     <div className={topbarStyles}>
//       <div>
//         <h2 className="text-lg font-semibold">Welcome, Investor!</h2>
//       </div>
//       <div className="flex items-center space-x-4">
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//         >
//           <FiBell className="text-xl" />
//         </motion.button>
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//         >
//           <FiLogOut className="text-xl" />
//         </motion.button>
//       </div>
//     </div>
//   );
// };

// // Main Content Component
// const MainContent = () => {
//   return (
//     <div className="p-6">
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
//           <h3 className="text-lg font-bold mb-2">Startup Recommendations</h3>
//           <p>Discover startups matching your investment preferences.</p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
//           <h3 className="text-lg font-bold mb-2">Investment Portfolio</h3>
//           <p>View your current investments and their performance.</p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
//           <h3 className="text-lg font-bold mb-2">Analytics</h3>
//           <p>Analyze investment trends and gain insights.</p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Parent Dashboard Component
// const InvestorDashboard = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div className={`${layoutStyles} ${darkMode ? 'dark' : ''}`}>
//       <Navbar />
//       <div className={contentStyles}>
//         <Topbar />
//         <MainContent />
//       </div>
//       <button
//         className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500"
//         onClick={() => setDarkMode(!darkMode)}
//       >
//         Toggle {darkMode ? 'Light' : 'Dark'} Mode
//       </button>
//     </div>
//   );
// };

// export default InvestorDashboard;


// src/app/dashboard/dashboard.tsx
'use client';

import { useState, useEffect } from "react";
import InvestorDashboard from "../Dashboard/investor/index";
import StartupDashboard from "../Dashboard/startup/index";
// import AdminDashboard from "../components/dashboard/admin/admin-dashboard";

// Example to simulate role fetching (could be from context, authentication, or API)
const getUserRole = async () => {
  // Simulate an async call to fetch user role (e.g., from an API or user context)
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("startup"); // Change this to simulate different roles
    }, 1000);
  });
};

const MainDashboard = () => {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    // Fetch the user role on component mount (e.g., from API or context)
    const fetchUserRole = async () => {
      const userRole = await getUserRole();
      setRole(userRole);
    };
    fetchUserRole();
  }, []);

  // Function to render the appropriate dashboard based on the role
  const renderDashboard = () => {
    switch (role) {
      case "investor":
        return <InvestorDashboard />;
      case "startup":
        return <StartupDashboard />;
      // case "admin":
      //   return <AdminDashboard />;
      default:
        return <div className="text-red-500">Error: Invalid role</div>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Main Dashboard</h1>
      {/* Render loading state if role is not yet available */}
      {role ? renderDashboard() : <div className="text-lg">Loading...</div>}
    </div>
  );
};

export default MainDashboard;

