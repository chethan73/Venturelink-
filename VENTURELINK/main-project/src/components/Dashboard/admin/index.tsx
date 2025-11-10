// 'use client';

// import { ReactNode, useState, useEffect } from 'react'; // Added missing imports
// import Link from 'next/link';
// import { FaTachometerAlt, FaChartLine, FaRegFileAlt, FaCog, FaBell } from 'react-icons/fa';
// import { FaUsers, FaUserCheck, FaProjectDiagram } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// // Sidebar Component
// const AdminSidebar = () => {
//   return (
//     <div className="w-64 bg-black text-white shadow-lg h-full p-5">
//       <h2 className="text-xl font-bold mb-5 text-white">Admin Panel</h2>
//       <nav className="space-y-4">
//         <Link href="/dashboard/admin">
//           <motion.p
//             className="p-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
//             whileHover={{ scale: 1.1, rotate: 5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <FaTachometerAlt className="text-white" />
//             <span>Dashboard</span>
//           </motion.p>
//         </Link>
//         <Link href="/admin/users">
//           <motion.p
//             className="p-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
//             whileHover={{ scale: 1.1, rotate: 5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <FaUsers className="text-white" />
//             <span>User Management</span>
//           </motion.p>
//         </Link>
//         <Link href="/admin/projects">
//           <motion.p
//             className="p-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
//             whileHover={{ scale: 1.1, rotate: 5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <FaRegFileAlt className="text-white" />
//             <span>Project Proposals</span>
//           </motion.p>
//         </Link>
//         <Link href="/admin/analytics">
//           <motion.p
//             className="p-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
//             whileHover={{ scale: 1.1, rotate: 5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <FaChartLine className="text-white" />
//             <span>Analytics</span>
//           </motion.p>
//         </Link>
//         <Link href="/admin/settings">
//           <motion.p
//             className="p-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
//             whileHover={{ scale: 1.1, rotate: 5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <FaCog className="text-white" />
//             <span>Settings</span>
//           </motion.p>
//         </Link>
//         <Link href="/admin/feedback">
//           <motion.p
//             className="p-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
//             whileHover={{ scale: 1.1, rotate: 5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <FaBell className="text-white" /> {/* Changed from FaCog to FaBell for consistency */}
//             <span>Feedback</span> {/* Corrected the capitalization */}
//           </motion.p>
//         </Link>
//       </nav>
//     </div>
//   );
// };

// // Topbar Component
// const AdminTopbar = () => {
//   return (
//     <div className="bg-white shadow-md p-4 flex justify-between items-center">
//       <h1 className="text-lg font-bold">Admin Dashboard</h1>
//       <div className="flex items-center space-x-4">
//         {/* Right Section: Notifications, Profile Dropdown, Gamification Icon */}
//       <div className="flex items-center space-x-6 relative">
//         {/* Bell Notification Button */}
//         <Link href="/admin/notification">
//         <motion.button
//           whileHover={{ scale: 1.2 }}
//           className="p-3 rounded-full bg-white hover:bg-gray-200 transition-all"
//         >
//           <FaBell className="text-xl text-indigo-600" />
//         </motion.button>
//         </Link>
//         <span className="font-semibold">Admin</span>
//       </div>
//       </div>
//     </div>
//   );
// };

// // Admin Dashboard Page Content
// interface RoleBreakdown {
//   role: string;
//   count: number;
// }

// interface Analytics {
//   totalUsers: number;
//   activeUsers: number;
//   totalProjects: number;
//   roleBreakdown: RoleBreakdown[];
// }

// const AdminAnalytics = () => {
//   const [analytics, setAnalytics] = useState<Analytics | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/getanalytics');
//         if (!response.ok) {
//           throw new Error(`Error fetching analytics: ${response.statusText}`);
//         }
//         const data = await response.json();
//         console.log("Fetched Analytics Data:", data); // Debugging Log

//         // Ensure numerical values are extracted correctly
//         const fixedData: Analytics = {
//           totalUsers: Array.isArray(data.totalUsers) ? data.totalUsers.length : data.totalUsers,
//           activeUsers: data.activeUsers ?? 0,
//           totalProjects: Array.isArray(data.totalProjects) ? data.totalProjects.length : data.totalProjects,
//           roleBreakdown: Array.isArray(data.roleBreakdown) ? data.roleBreakdown : [],
//         };

//         setAnalytics(fixedData);
//         setLoading(false);
//       } catch (error: any) {
//         console.error(error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   if (loading) return <div className="p-6 text-gray-600">Loading analytics...</div>;
//   if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-6">Admin Dashboard - Analytics</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <StatCard icon={<FaUsers className="text-indigo-500 w-8 h-8" />} title="Total Users" value={analytics.totalUsers} color="bg-indigo-100" />
//         <StatCard icon={<FaUserCheck className="text-green-500 w-8 h-8" />} title="Active Users" value={analytics.activeUsers} color="bg-green-100" />
//         <StatCard icon={<FaProjectDiagram className="text-blue-500 w-8 h-8" />} title="Total Projects" value={analytics.totalProjects} color="bg-blue-100" />
//       </div>

//       {/* Role Breakdown */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-4">User Role Breakdown</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {analytics.roleBreakdown.map((role, index) => (
//             <motion.div
//               key={index}
//               className={`p-6 bg-white shadow-lg rounded-lg ${getRoleColor(role.role)} hover:shadow-xl transition-shadow duration-300`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <h4 className="font-semibold text-xl">{role.role}</h4>
//               <p className="text-gray-500">{role.count} Users</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper function to return dynamic colors for different roles
// const getRoleColor = (role: string) => {
//   switch (role) {
//     case 'Admin':
//       return 'bg-yellow-100 text-yellow-600';
//     case 'User':
//       return 'bg-gray-100 text-gray-600';
//     case 'Moderator':
//       return 'bg-purple-100 text-purple-600';
//     default:
//       return 'bg-blue-100 text-blue-600';
//   }
// };

// // 📌 **Reusable StatCard Component with Animation**
// const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: number; color: string }) => (
//   <motion.div
//     className={`p-6 shadow-md rounded-lg flex items-center space-x-4 ${color} hover:scale-105 transition-transform duration-300`}
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ duration: 0.5 }}
//   >
//     {icon}
//     <div>
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <p className="text-gray-500">{value}</p>
//     </div>
//   </motion.div>
// );

// // Admin Layout Wrapper
// export default function AdminLayout({ children }: { children: ReactNode }) {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <AdminSidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         {/* Topbar */}
//         <AdminTopbar />

//         {/* Main Content */}
//         <main className="p-6">{children || <AdminAnalytics />}</main>
//       </div>
//     </div>
//   );
// }


'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTachometerAlt, FaChartLine, FaRegFileAlt, FaCog, FaBell } from 'react-icons/fa';
import { FaUsers, FaUserCheck, FaProjectDiagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Sidebar Component
const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-full p-5 border-r border-gray-700">
      <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
        <span className="bg-indigo-600 p-2 rounded-lg">
          <FaTachometerAlt />
        </span>
        Admin Panel
      </h2>
      <nav className="space-y-2">
        {[
          { href: "/dashboard/admin", icon: <FaTachometerAlt />, text: "Dashboard" },
          { href: "/admin/users", icon: <FaUsers />, text: "User Management" },
          { href: "/admin/projects", icon: <FaRegFileAlt />, text: "Project Proposals" },
          { href: "/admin/analytics", icon: <FaChartLine />, text: "Analytics" },
          // { href: "/admin/settings", icon: <FaCog />, text: "Settings" },
          { href: "/admin/feedback", icon: <FaBell />, text: "Feedback" }
        ].map((item, index) => (
          <Link href={item.href} key={index}>
            <motion.div
              className="p-3 rounded-lg hover:bg-gray-700 flex items-center space-x-3 transition-all duration-200 group"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-indigo-400 group-hover:text-indigo-300 text-lg">{item.icon}</span>
              <span className="text-gray-300 group-hover:text-white">{item.text}</span>
            </motion.div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

// Topbar Component
const AdminTopbar = () => {
  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-gray-200">
      <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-6 relative">
          <Link href="/admin/notification">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white hover:bg-gray-100 transition-all relative"
            >
              <FaBell className="text-xl text-indigo-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              A
            </div>
            <span className="font-semibold text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Page Content
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
        console.log("Fetched Analytics Data:", data);

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

  if (loading) return (
    <div className="p-6 flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow">
      <p className="font-medium">Error:</p>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Analytics Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={<FaUsers className="text-indigo-600 w-6 h-6" />} 
          title="Total Users" 
          value={analytics.totalUsers} 
          trend="up" 
        />
        <StatCard 
          icon={<FaUserCheck className="text-green-600 w-6 h-6" />} 
          title="Active Users" 
          value={analytics.activeUsers} 
          trend="up" 
        />
        <StatCard 
          icon={<FaProjectDiagram className="text-blue-600 w-6 h-6" />} 
          title="Total Projects" 
          value={analytics.totalProjects} 
          trend="neutral" 
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">User Role Distribution</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analytics.roleBreakdown.map((role, index) => (
            <motion.div
              key={index}
              className={`p-5 rounded-lg ${getRoleColorClass(role.role)} shadow-sm hover:shadow-md transition-shadow`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-700">{role.role}</h4>
                  <p className="text-2xl font-bold mt-2">{role.count}</p>
                </div>
                <div className={`p-2 rounded-lg ${getRoleIconBgClass(role.role)}`}>
                  <FaUsers className={getRoleIconColorClass(role.role)} />
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getRoleProgressColor(role.role)}`} 
                  style={{ width: `${(role.count / analytics.totalUsers) * 100}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced helper functions for role styling
const getRoleColorClass = (role: string) => {
  switch (role) {
    case 'Admin': return 'bg-yellow-50';
    case 'User': return 'bg-gray-50';
    case 'Moderator': return 'bg-purple-50';
    default: return 'bg-blue-50';
  }
};

const getRoleIconBgClass = (role: string) => {
  switch (role) {
    case 'Admin': return 'bg-yellow-100';
    case 'User': return 'bg-gray-100';
    case 'Moderator': return 'bg-purple-100';
    default: return 'bg-blue-100';
  }
};

const getRoleIconColorClass = (role: string) => {
  switch (role) {
    case 'Admin': return 'text-yellow-600';
    case 'User': return 'text-gray-600';
    case 'Moderator': return 'text-purple-600';
    default: return 'text-blue-600';
  }
};

const getRoleProgressColor = (role: string) => {
  switch (role) {
    case 'Admin': return 'bg-yellow-400';
    case 'User': return 'bg-gray-400';
    case 'Moderator': return 'bg-purple-400';
    default: return 'bg-blue-400';
  }
};

// Enhanced StatCard Component
const StatCard = ({ icon, title, value, trend }: { 
  icon: React.ReactNode; 
  title: string; 
  value: number; 
  trend: 'up' | 'down' | 'neutral' 
}) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-green-100 text-green-600' : trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={`flex items-center ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
        {trend === 'up' ? (
          <>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            +5.2%
          </>
        ) : trend === 'down' ? (
          <>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            -2.1%
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            0.0%
          </>
        )}
      </span>
      <span className="text-gray-500 ml-2">vs last week</span>
    </div>
  </motion.div>
);

// Admin Layout Wrapper
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children || <AdminAnalytics />}
        </main>
      </div>
    </div>
  );
}