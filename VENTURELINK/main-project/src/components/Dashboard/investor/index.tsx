// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from 'react';
// import { motion,AnimatePresence } from 'framer-motion';
// import { BarChart, MessageCircle, User, Briefcase, Search, Upload,Bell,Calendar,Settings,HelpCircle,Users } from 'react-feather'; // Importing the Upload icon
// import Link from 'next/link'; // <-- Import the Link component
// import { FaTrophy, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Additional icons
// import { FiBarChart, FiTrendingUp, FiLayers, FiDatabase, FiPlayCircle, FiClock } from "react-icons/fi";

// // import StartupInvestorConnections from './startup-investor-connections';
// // import InvestmentPortfolio from './investment-portfolio';
// // import AIRecommendedStartups from './ai-powered-matchmaking';
// // import RealTimeCommunication from './real-time-communication';
// // import ProjectProposalManagement from './project-proposal-management';
// // import AnalyticsAndReporting from './analytics-reporting';
// // import DocumentManagement from './document-management';
// // import RealTimeNotifications from './real-time-notifications';
// import { useRouter } from 'next/navigation';
// // import { socket } from '../socket';
// // import { Users2 } from 'lucide-react';

// // Layout Styles
// const layoutStyles = `min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300 ease-in-out`;
// // const sidebarStyles = `w-80 bg-gradient-to-b from-indigo-600 to-indigo-700 shadow-xl flex flex-col items-center py-8 text-white`;
// // const contentStyles = `flex-1 flex flex-col p-6 space-y-8 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900`;
// // const topbarStyles = `w-full bg-white dark:bg-gray-900 px-6 py-4 flex justify-between items-center shadow-lg`;

// // Animation Variants
// // const fadeIn = {
// //   hidden: { opacity: 0 },
// //   visible: { opacity: 1, transition: { duration: 0.6 } },
// // };

// // const slideIn = {
// //   hidden: { x: '-100%' },
// //   visible: { x: 0, transition: { type: 'spring', stiffness: 100, damping: 25 } },
// // };

// // const cardHover = {
// //   hover: { scale: 1.05, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' },
// // };

// const buttonHover = {
//   hover: { scale: 1.1, rotate: 15, transition: { type: 'spring', stiffness: 300, damping: 10 } },
// };

// // Sidebar Component
  
// // Sidebar Component

// const Sidebar = () => {
//   return (
//     <motion.div className="w-80 bg-black text-white p-8">
//       <h2 className="text-3xl mb-8">Investor Dashboard</h2>
//       <ul className="space-y-6">
//         <Link href="/investor/Dashboard">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <BarChart className="mr-3" size={24} />
//             <span>Dashboard</span>
//           </li>
//         </Link>
//         <Link href="/investor/Messages">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <MessageCircle className="mr-3" size={24} />
//             <span>Messages</span>
//           </li>
//         </Link>
//         <Link href="/investor/Profile">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <User className="mr-3" size={24} />
//             <span>Profile</span>
//           </li>
//         </Link>
//         <Link href="/investor/investments">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <Briefcase className="mr-3" size={24} />
//             <span>Investments</span>
//           </li>
//         </Link>
//         <Link href="/investor/Search">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <Search className="mr-3" size={24} />
//             <span>Search</span>
//           </li>
//         </Link>

//         {/* New Link for Upload Investment Details with Icon */}
//         <Link href="/investor/InvestorDetails">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <Upload className="mr-3" size={24} />
//             <span>Upload Investment Details</span>
//           </li>
//         </Link>

//         {/* New Notifications Link */}
//         <Link href="/investor/notifications">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <Bell className="mr-3" size={24} />
//             <span>Notifications</span>
//           </li>
//         </Link>

//         {/* New Calendar Link */}
//         <Link href="/investor/Calendar">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <Calendar className="mr-3" size={24} />
//             <span>Calendar</span>
//           </li>
//         </Link>

//         {/* New Settings Link */}
//         <Link href="/investor/settings">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <Settings className="mr-3" size={24} />
//             <span>Settings</span>
//           </li>
//         </Link>

//         {/* New Help & Support Link */}
//         <Link href="/investor/HelpAndSupport">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <HelpCircle className="mr-3" size={24} />
//             <span>Help & Support</span>
//           </li>
//         </Link>

//         {/* New Investor Network Link */}
//         <Link href="/investor/UploadPage">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <Users className="mr-3" size={24} />
//             <span>uploads page</span>
//           </li>
//         </Link>
//         {/* New Investor Network Link */}
//         <Link href="/investor/Shortlisting">
//           <li className="flex items-center p-4 hover:bg-indigo-600 rounded-lg cursor-pointer">
//             <Users className="mr-3" size={24} />
//             <span>Investor Network</span>
//           </li>
//         </Link>
//       </ul>
//     </motion.div>
//   );
// };

// // Topbar


// const Topbar = () => {
//   const [user, setUser] = useState<any | null>(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     const data = localStorage.getItem("users2") ? JSON.parse(localStorage.getItem("users2") ?? "") : null;
//     setUser(data);
//   }, []);

//   // Handle logout
//   const onLogOutClick = () => {
//     localStorage.removeItem("users2");
//     router.replace("/"); // Redirect to the home page
//   };

//   // Toggle the dropdown visibility
//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
//   };

//   return (
//     <motion.div
//       className="bg-gradient-to-r from-white-500 to-indigo-600 flex justify-between items-center p-4 shadow-xl"
//       initial="hidden"
//       animate="visible"
//       transition={{ duration: 0.5 }}
//     >
//       {/* Left Section: User Greeting */}
//       <div className="flex items-center space-x-4 text-black">
//         <div>
//           <h2 className="text-lg font-semibold">Welcome, {user?.full_name || "Investor"}!</h2>
//         </div>
//       </div>

//       {/* Right Section: Notifications, Profile Dropdown, Gamification Icon */}
//       <div className="flex items-center space-x-6 relative">
//         {/* Bell Notification Button */}
//         <Link href="/investor/notifications">
//         <motion.button
//           whileHover={{ scale: 1.2 }}
//           className="p-3 rounded-full bg-white hover:bg-gray-200 transition-all"
//         >
//           <FaBell className="text-xl text-indigo-600" />
//         </motion.button>
//         </Link>

//         {/* Gamification Button with Link */}
//         <Link href="/investor/gamification">
//           <motion.button
//             whileHover={{ scale: 1.2 }}
//             className="p-3 rounded-full bg-white hover:bg-gray-200 transition-all"
//           >
//             <FaTrophy className="text-xl text-indigo-500" />
//           </motion.button>
//         </Link>

//         {/* Settings Button */}
//         <Link href="/investor/settings">
//           <motion.button
//             whileHover={{ scale: 1.2 }}
//             className="p-3 rounded-full bg-white hover:bg-gray-200 transition-all"
//           >
//             <FaCog className="text-xl text-indigo-500" />
//           </motion.button>
//         </Link>

//         {/* Profile Dropdown */}
//         <div className="relative">
//           <motion.button
//             onClick={toggleDropdown}
//             className="p-3 rounded-full bg-white hover:bg-gray-200 transition-all flex items-center"
//             whileHover={{ scale: 1.1 }} // Hover scaling effect
//             whileTap={{ scale: 0.95 }} // Tap effect
//           >
//             <span className="text-gray-800">{user?.full_name || "Investor"}</span>
//           </motion.button>

//           {/* Dropdown Menu */}
//           {isDropdownOpen && (
//             <motion.div
//               className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ type: "spring", stiffness: 200, damping: 25 }}
//             >
//               <div className="p-4">
//                 <p><strong>Name:</strong> {user?.full_name || "N/A"}</p>
//                 <p><strong>Email:</strong> {user?.email || "N/A"}</p>
//                 <p><strong>Phone:</strong> {user?.number || "N/A"}</p>
//               </div>
//               <div className="border-t border-gray-300">
//               <Link href="/investor/settings">
//                 <button
//                   className="w-full text-left p-4 hover:bg-gray-200"
//                   onClick={() => console.log("Edit profile clicked")}
//                 >
//                   Edit Profile
//                 </button>
//                 </Link>
//                 <button
//                   className="w-full text-left p-4 hover:bg-gray-200"
//                   onClick={onLogOutClick}
//                 >
//                   <FaSignOutAlt className="mr-2" />
//                   Log Out
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };


// // Main-Content

// const cards = [
//   {
//     title: "Investment Insights",
//     icon: <FiBarChart className="w-16 h-16 mb-4 text-indigo-600" />,
//     description: "Quick insights about investment trends",
//     bgColor: "bg-indigo-100"
//   },
//   {
//     title: "Investment Strategy",
//     icon: <FiLayers className="w-16 h-16 mb-4 text-blue-500" />,
//     description: "Detailed investment strategy info...",
//     bgColor: "bg-blue-100"
//   },
//   {
//     title: "Performance Analytics",
//     icon: <FiDatabase className="w-16 h-16 mb-4 text-green-500" />,
//     description: "Interactive visualizations for performance metrics",
//     bgColor: "bg-green-100"
//   },
//   {
//     title: "Real-Time Data",
//     icon: <FiPlayCircle className="w-16 h-16 mb-4 text-yellow-500" />,
//     description: "Live updates and real-time tracking",
//     bgColor: "bg-yellow-100"
//   },
//   {
//     title: "Investor Notifications",
//     icon: <FiClock className="w-16 h-16 mb-4 text-red-500" />,
//     description: "Stay updated with key alerts",
//     bgColor: "bg-red-100"
//   },
//   {
//     title: "AI Recommendations",
//     icon: <FiTrendingUp className="w-16 h-16 mb-4 text-purple-500" />,
//     description: "Personalized suggestions powered by AI",
//     bgColor: "bg-purple-100"
//   },
// ];

// const MainContent = () => {
//   const [currentCard, setCurrentCard] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     if (!isPaused) {
//       const timer = setInterval(() => {
//         setCurrentCard((prev) => (prev + 1) % cards.length);
//       }, 3000);
//       return () => clearInterval(timer);
//     }
//   }, [isPaused]);

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-12">
//       <div className="w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl border border-gray-200">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentCard}
//             className={`p-14 text-center ${cards[currentCard].bgColor} hover:shadow-2xl transition-transform transform duration-700 cursor-pointer rounded-3xl`}
//             initial={{ x: 300, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: -300, opacity: 0 }}
//             transition={{ duration: 1 }}
//             onClick={() => setIsPaused(!isPaused)}
//           >
//             <motion.div
//               className="flex flex-col items-center justify-center gap-6"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.8 }}
//             >
//               {cards[currentCard].icon}
//               <h2 className="text-5xl font-extrabold text-gray-800 drop-shadow-md">{cards[currentCard].title}</h2>
//               <p className="text-xl text-gray-700 italic">{cards[currentCard].description}</p>
//               <p className="text-sm italic text-gray-500">{isPaused ? "Paused" : "Auto-Sliding... (Click to Pause)"}</p>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };





// // Floating Action Button (FAB)
// // const FAB = () => {
// //   return (
// //     <motion.button
// //       className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-500"
// //       whileHover={buttonHover}
// //     >
// //       <Bell className="text-xl" />
// //     </motion.button>
// //   );
// // };

// // Investor Dashboard Component with Dark Mode Toggle
// const InvestorDashboard = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   useEffect(() => {
//         //   const user = JSON.parse(localStorage.getItem("users2") ?? "");
          
//         //  socket.emit("register",user.id);
 
//         //  socket.on("new-message", (data) => {
//         //      console.log("New message:", data.message);
//         //      window.alert("New Message : " + data.message);
//         //  });
 
//         //  return () => {
//         //      socket.disconnect();
//         //  };
//     }, [])
//   return (
//     <div className={`${layoutStyles} ${darkMode ? "dark" : ""}`}>
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Topbar />
//         <MainContent />
//         {/* <FAB /> */}
//       </div>
//       {/* <motion.button
//         className="fixed bottom-4 right-4 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500"
//         whileHover={buttonHover}
//         onClick={() => setDarkMode(!darkMode)}
//       >
//         Toggle {darkMode ? "Light" : "Dark"} Mode
//       </motion.button> */}
//     </div>
//   );
// };

// export default InvestorDashboard;


// 'use client';
// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   BarChart, MessageCircle, User, Briefcase, 
//   Search, Upload, Bell, Calendar, 
//   Settings, HelpCircle, Users 
// } from 'react-feather';
// import { 
//   FaTrophy, FaBell, FaCog, FaSignOutAlt, 
//   FaChevronDown, FaChevronRight 
// } from 'react-icons/fa';
// import { 
//   FiBarChart, FiTrendingUp, FiLayers, 
//   FiDatabase, FiPlayCircle, FiClock 
// } from "react-icons/fi";
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// // ==============
// // Design System
// // ==============

// const StatCard = ({ title, value, change, icon, trend }: {
//   title: string;
//   value: string;
//   change: string;
//   icon: React.ReactNode;
//   trend: 'up' | 'down';
// }) => (
//   <motion.div
//     className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
//     whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}
//   >
//     <div className="flex justify-between items-start">
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <p className="text-2xl font-bold mt-1 text-gray-800">{value}</p>
//       </div>
//       <div className="p-2 rounded-lg bg-gray-50">
//         {icon}
//       </div>
//     </div>
//     <p className={`mt-3 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
//       {change} from last month
//     </p>
//   </motion.div>
// );

// const FeatureCard = ({ title, description, icon, color }: {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   color: string;
// }) => (
//   <motion.div
//     className={`bg-gradient-to-br ${color} rounded-xl p-6 h-full flex flex-col`}
//     whileHover={{ y: -5 }}
//   >
//     <div className="flex items-center mb-4">
//       <div className="p-3 rounded-lg bg-white/80 shadow-sm mr-4">
//         {icon}
//       </div>
//       <h3 className="text-lg font-bold text-gray-800">{title}</h3>
//     </div>
//     <p className="text-gray-600 mb-6">{description}</p>
//     {/* <motion.button
//       className="mt-auto px-4 py-2 bg-white rounded-lg text-sm font-medium shadow-sm w-fit"
//       whileHover={{ x: 3 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       Explore
//     </motion.button> */}
//   </motion.div>
// );

// // ==============
// // Main Components
// // ==============

// const Sidebar = () => {
//   const [activeLink, setActiveLink] = useState('');
  
//   useEffect(() => {
//     setActiveLink(window.location.pathname);
//   }, []);

//   const navItems = [
//     { href: '/investor/Dashboard', icon: <BarChart size={18} />, label: 'Dashboard' },
//     { href: '/investor/Profile', icon: <User size={18} />, label: 'Profile' },
//     { href: '/investor/Messages', icon: <MessageCircle size={18} />, label: 'Messages' },
//     { href: '/investor/Search', icon: <Search size={18} />, label: 'Search Startups' },
//     { href: '/investor/investments', icon: <Briefcase size={18} />, label: 'Investments' },
    
//     { href: '/investor/InvestorDetails', icon: <Upload size={18} />, label: 'Upload Details' },
//     { href: '/investor/SmartBot', icon: <Upload size={18} />, label: 'AI-Chat' },
//     // { href: '/investor/notifications', icon: <Bell size={18} />, label: 'Notifications' },
    
    
//     { href: '/investor/UploadPage', icon: <Users size={18} />, label: 'Network' },
//     { href: '/investor/Shortlisting', icon: <Users size={18} />, label: 'Startup Matches' },
//     { href: '/investor/fundingneed', icon: <Users size={18} />, label: 'fundingneed' },
//     { href: '/investor/Calendar', icon: <Calendar size={18} />, label: 'Calendar' },
//     { href: '/investor/settings', icon: <Settings size={18} />, label: 'Settings' },
//     { href: '/investor/HelpAndSupport', icon: <HelpCircle size={18} />, label: 'Help Center' },
//   ];

//   return (
// //     


// <div className="w-72 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 flex flex-col border-r border-gray-700">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="mb-8"
//       >
//         <h1 className="text-2xl font-bold">
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Investor</span> Portal
//         </h1>
//         <p className="text-sm text-gray-400 mt-1">Accelerate your growth</p>
//       </motion.div>

//       <nav className="flex-1">
//         <ul className="space-y-1">
//           {navItems.map((link) => (
//             <motion.li
//               key={link.href}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ type: "spring" }}
//             >
//               <Link href={link.href}>
//                 <div
//                   className={`flex items-center p-3 rounded-lg transition-all ${activeLink === link.href ? 'bg-blue-500/10 border-l-4 border-blue-500' : 'hover:bg-white/5'}`}
//                   onClick={() => setActiveLink(link.href)}
//                 >
//                   <span className={`${activeLink === link.href ? 'text-blue-400' : 'text-gray-400'}`}>
//                     {link.icon}
//                   </span>
//                   <span className={`ml-3 ${activeLink === link.href ? 'text-white font-medium' : 'text-gray-300'}`}>
//                     {link.label}
//                   </span>
//                   <FaChevronRight className={`ml-auto text-xs ${activeLink === link.href ? 'text-blue-400' : 'text-gray-500'}`} />
//                 </div>
//               </Link>
//             </motion.li>
//           ))}
//         </ul>
//       </nav>

//       <motion.div
//         className="mt-auto pt-4 border-t border-gray-700"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <div className="flex items-center justify-between text-gray-500 text-xs">
//           <span>v2.5.0</span>
//           <span>© {new Date().getFullYear()}</span>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const Topbar = () => {
//   const [user, setUser] = useState<any | null>(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const data = localStorage.getItem("users2") ? JSON.parse(localStorage.getItem("users2") ?? "") : null;
//     setUser(data);
//   }, []);

//   const onLogOutClick = () => {
//     localStorage.removeItem("users2");
//     router.replace("/");
//   };

//   return (
//     <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//       <div className="flex items-center space-x-3">
//         <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
//           {user?.full_name?.charAt(0) || "I"}
//         </div>
//         <div>
//           <h2 className="font-medium text-gray-600">Welcome back,</h2>
//           <p className="font-semibold text-gray-800">{user?.full_name || "Investor"}</p>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4">
//         <Link href="/investor/notifications" className="relative">
//           <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
//             <FaBell className="text-gray-600" />
//             <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
//           </div>
//         </Link>

//         <Link href="/investor/gamification">
//           <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
//             <FaTrophy className="text-yellow-500" />
//           </div>
//         </Link>

//         <div className="relative">
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             <span className="font-medium text-gray-700">{user?.full_name || "User"}</span>
//             <FaChevronDown className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
//           </button>

//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-gray-200">
//               <div className="p-4 border-b">
//                 <p className="font-medium">{user?.full_name || "User"}</p>
//                 <p className="text-sm text-gray-500 truncate">{user?.email || "No email"}</p>
//               </div>
//               <div className="p-1">
//                 <Link href="/investor/settings">
//                   <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
//                     Account Settings
//                   </button>
//                 </Link>
//                 <button
//                   onClick={onLogOutClick}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm flex items-center text-red-500"
//                 >
//                   <FaSignOutAlt className="mr-2" />
//                   Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const DashboardStats = () => {
//   const stats = [
//     {
//       title: "Portfolio Value",
//       value: "$1,248,750",
//       change: "+12%",
//       icon: <FiBarChart className="w-5 h-5 text-blue-500" />,
//       trend: "up" as const
//     },
//     {
//       title: "Active Investments",
//       value: "24",
//       change: "+5%",
//       icon: <FiLayers className="w-5 h-5 text-purple-500" />,
//       trend: "up" as const
//     },
//     {
//       title: "New Opportunities",
//       value: "12",
//       change: "+23%",
//       icon: <FiDatabase className="w-5 h-5 text-green-500" />,
//       trend: "up" as const
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-4">
//       {stats.map((stat, index) => (
//         <StatCard key={index} {...stat} />
//       ))}
//     </div>
//   );
// };

// const DashboardFeatures = () => {
//   const features = [
//     {
//       title: "Market Insights",
//       description: "Real-time analytics and investment trends",
//       icon: <FiBarChart className="w-6 h-6 text-blue-500" />,
//       color: "from-blue-50 to-blue-100"
//     },
//     {
//       title: "Deal Flow",
//       description: "Manage your investment pipeline",
//       icon: <FiLayers className="w-6 h-6 text-purple-500" />,
//       color: "from-purple-50 to-purple-100"
//     },
//     {
//       title: "Portfolio Analytics",
//       description: "Track performance metrics",
//       icon: <FiDatabase className="w-6 h-6 text-green-500" />,
//       color: "from-green-50 to-green-100"
//     },
//     {
//       title: "Startup Matches",
//       description: "AI-powered recommendations",
//       icon: <FiPlayCircle className="w-6 h-6 text-yellow-500" />,
//       color: "from-yellow-50 to-yellow-100"
//     },
//     {
//       title: "Alerts",
//       description: "Important updates and reminders",
//       icon: <FiClock className="w-6 h-6 text-red-500" />,
//       color: "from-red-50 to-red-100"
//     },
//     {
//       title: "Reports",
//       description: "Generate detailed reports",
//       icon: <FiTrendingUp className="w-6 h-6 text-indigo-500" />,
//       color: "from-indigo-50 to-indigo-100"
//     }
//   ];

//   return (
//     <div className="px-6 py-4">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {features.map((feature, index) => (
//           <FeatureCard key={index} {...feature} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const InvestorDashboard = () => {
//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Topbar />
//         <main className="flex-1 overflow-y-auto">
//           <DashboardStats />
//           <DashboardFeatures />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default InvestorDashboard;

'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, MessageCircle, User, Briefcase, 
  Search, Upload, Bell, Calendar, 
  Settings, HelpCircle, Users,DollarSign, FileText
} from 'react-feather';
import { 
  FaTrophy, FaBell, FaCog, FaSignOutAlt, 
  FaChevronDown, FaChevronRight, FaRobot
} from 'react-icons/fa';
import { 
  FiBarChart, FiTrendingUp, FiLayers, 
  FiDatabase, FiPlayCircle, FiClock 
} from "react-icons/fi";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ==============
// Design System
// ==============

const StatCard = ({ title, value, change, icon, trend }: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}) => (
  <motion.div
    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
    whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1 text-gray-800">{value}</p>
      </div>
      <div className="p-2 rounded-lg bg-gray-50">
        {icon}
      </div>
    </div>
    <p className={`mt-3 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
      {change} from last month
    </p>
  </motion.div>
);

const FeatureCard = ({ title, description, icon, color }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <motion.div
    className={`bg-gradient-to-br ${color} rounded-xl p-6 h-full flex flex-col`}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-lg bg-white/80 shadow-sm mr-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 mb-6">{description}</p>
  </motion.div>
);

// ==============
// Main Components
// ==============

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('');
  
  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  // const navItems = [
  //   { href: '/investor/Dashboard', icon: <BarChart size={18} />, label: 'Dashboard' },
  //   { href: '/investor/Profile', icon: <User size={18} />, label: 'Profile' },
  //   { href: '/investor/Messages', icon: <MessageCircle size={18} />, label: 'Messages' },
  //   { href: '/investor/Search', icon: <Search size={18} />, label: 'Find Startups' },
  //   { href: '/investor/investments', icon: <Briefcase size={18} />, label: 'Pitch Viewer' },
  //   { href: '/investor/InvestorDetails', icon: <Upload size={18} />, label: 'Proposal' },
  //   { href: '/investor/SmartBot', icon: <Upload size={18} />, label: 'AI-Chat' },
  //   { href: '/investor/UploadPage', icon: <Users size={18} />, label: 'Network' },
  //   { href: '/investor/Shortlisting', icon: <Users size={18} />, label: 'Startup Matches' },
  //   { href: '/investor/fundingneed', icon: <Users size={18} />, label: 'fundingneed' },
  //   { href: '/investor/Calendar', icon: <Calendar size={18} />, label: 'Calendar' },
  //   { href: '/investor/settings', icon: <Settings size={18} />, label: 'Settings' },
  //   { href: '/investor/HelpAndSupport', icon: <HelpCircle size={18} />, label: 'Help Center' },
  // ];

  const navItems = [
    { href: '/investor/Dashboard', icon: <BarChart size={18} />, label: 'Dashboard' },
    { href: '/investor/Profile', icon: <User size={18} />, label: 'Profile' },
    { href: '/investor/Search', icon: <Search size={18} />, label: 'Find Startups' },
    { href: '/investor/Messages', icon: <MessageCircle size={18} />, label: 'Messages' },
     { href: '/investor/InvestorDetails', icon: <Briefcase size={18} />, label: 'Proposal' },
    { href: '/investor/investments', icon: <FileText size={18} />, label: 'Pitch Viewer' },
   { href: '/investor/UploadPage', icon: <DollarSign size={18} />, label: 'Documents' },
   { href: '/investor/fundingneed', icon: <FileText size={18} />, label: 'fundingneed' },
    { href: '/investor/Shortlisting', icon: <Users size={18} />, label: 'Startup Matches' },
    { href: '/investor/SmartBot', icon: <Upload size={18} />, label: 'AI-Chat' },
    { href: '/investor/Calendar', icon: <Calendar size={18} />, label: 'Calendar' },
    { href: '/investor/settings', icon: <Settings size={18} />, label: 'Settings' },
    { href: '/investor/HelpAndSupport', icon: <HelpCircle size={18} />, label: 'Help Center' },
  ];

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 flex flex-col border-r border-gray-700">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Investor Portal</span> 
        </h1>
        <p className="text-sm text-gray-400 mt-1">Accelerate your growth</p>
      </motion.div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((link) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring" }}
            >
              <Link href={link.href}>
                <div
                  className={`flex items-center p-3 rounded-lg transition-all ${activeLink === link.href ? 'bg-blue-500/10 border-l-4 border-blue-500' : 'hover:bg-white/5'}`}
                  onClick={() => setActiveLink(link.href)}
                >
                  <span className={`${activeLink === link.href ? 'text-blue-400' : 'text-gray-400'}`}>
                    {link.icon}
                  </span>
                  <span className={`ml-3 ${activeLink === link.href ? 'text-white font-medium' : 'text-gray-300'}`}>
                    {link.label}
                  </span>
                  <FaChevronRight className={`ml-auto text-xs ${activeLink === link.href ? 'text-blue-400' : 'text-gray-500'}`} />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="mt-auto pt-4 border-t border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between text-gray-500 text-xs">
          <span>v2.5.0</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </motion.div>
    </div>
  );
};

const Topbar = () => {
  const [user, setUser] = useState<any | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("users2") ? JSON.parse(localStorage.getItem("users2") ?? "") : null;
    setUser(data);
  }, []);

  const onLogOutClick = () => {
    localStorage.removeItem("users2");
    router.replace("/");
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
          {user?.full_name?.charAt(0) || "I"}
        </div>
        <div>
          <h2 className="font-medium text-gray-600">Welcome back,</h2>
          <p className="font-semibold text-gray-800">{user?.full_name || "Investor"}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/investor/notifications" className="relative">
          <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <FaBell className="text-gray-600" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </Link>

        <Link href="/investor/gamification">
          <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <FaTrophy className="text-yellow-500" />
          </div>
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-700">{user?.full_name || "User"}</span>
            <FaChevronDown className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-gray-200">
              <div className="p-4 border-b">
                <p className="font-medium">{user?.full_name || "User"}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email || "No email"}</p>
              </div>
              <div className="p-1">
                <Link href="/investor/settings">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                    Account Settings
                  </button>
                </Link>
                <button
                  onClick={onLogOutClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm flex items-center text-red-500"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  const stats = [
    // {
    //   title: "Portfolio Value",
    //   value: "$1,248,750",
    //   change: "+12%",
    //   icon: <FiBarChart className="w-5 h-5 text-blue-500" />,
    //   trend: "up" as const
    // },
    // {
    //   title: "Active Investments",
    //   value: "24",
    //   change: "+5%",
    //   icon: <FiLayers className="w-5 h-5 text-purple-500" />,
    //   trend: "up" as const
    // },
    // {
    //   title: "New Opportunities",
    //   value: "12",
    //   change: "+23%",
    //   icon: <FiDatabase className="w-5 h-5 text-green-500" />,
    //   trend: "up" as const
    // }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

const DashboardFeatures = () => {
  const features = [
    {
      title: "Market Insights",
      description: "Real-time analytics and investment trends",
      icon: <FiBarChart className="w-6 h-6 text-blue-500" />,
      color: "from-blue-50 to-blue-100"
    },
    {
      title: "Deal Flow",
      description: "Manage your investment pipeline",
      icon: <FiLayers className="w-6 h-6 text-purple-500" />,
      color: "from-purple-50 to-purple-100"
    },
    {
      title: "Portfolio Analytics",
      description: "Track performance metrics",
      icon: <FiDatabase className="w-6 h-6 text-green-500" />,
      color: "from-green-50 to-green-100"
    },
    {
      title: "Startup Matches",
      description: "AI-powered recommendations",
      icon: <FiPlayCircle className="w-6 h-6 text-yellow-500" />,
      color: "from-yellow-50 to-yellow-100"
    },
    {
      title: "Alerts",
      description: "Important updates and reminders",
      icon: <FiClock className="w-6 h-6 text-red-500" />,
      color: "from-red-50 to-red-100"
    },
    {
      title: "Reports",
      description: "Generate detailed reports",
      icon: <FiTrendingUp className="w-6 h-6 text-indigo-500" />,
      color: "from-indigo-50 to-indigo-100"
    }
  ];

  return (
    <div className="px-6 py-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

const AiNews = () => {
  const [summary, setSummary] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAiNews() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/ai-news");
        const data = await res.json();
        setSummary(data.summary || "No summary available.");
        setImageBase64(data.image || null);
      } catch (error) {
        setSummary("Failed to load news.");
        setImageBase64(null);
        console.error("Fetch error:", error);
      }
      setLoading(false);
    }

    fetchAiNews();
  }, []);

  return (
    <div className="mx-6 mb-6 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        <motion.div 
          className="flex items-center mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl mr-4">
            <FaRobot className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">AI-Powered Market Insights</h2>
            <p className="text-sm text-gray-500">Latest investment trends and analysis</p>
          </div>
        </motion.div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="flex space-x-2 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="text-gray-500">Generating insights...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{summary}</p>
              </div>
            </motion.div>
            
            {imageBase64 && (
              <motion.div
                className="relative group overflow-hidden rounded-xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <img
                  src={`data:image/png;base64,${imageBase64}`}
                  alt="AI generated startup funding visual"
                  className="w-full h-auto rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-medium">AI-Generated Market Analysis</span>
                </div>
              </motion.div>
            )}
            
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
                <span>Refresh insights</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

const InvestorDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <DashboardStats />
          <AiNews />
          <DashboardFeatures />
        </main>
      </div>
    </div>
  );
};

export default InvestorDashboard;