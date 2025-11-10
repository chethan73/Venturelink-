// 'use client';
// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   BarChart, MessageCircle, User, Search, Upload, 
//   DollarSign, Users, FileText, Calendar, 
//   Settings, Bell, HelpCircle, 
//   users2
// } from 'lucide-react';
// import { 
//   FiBarChart, FiTrendingUp, FiLayers, 
//   FiDatabase, FiPlayCircle, FiClock 
// } from "react-icons/fi";
// import { 
//   FaTrophy, FaBell, FaCog, FaSignOutAlt, 
//   FaChevronDown, FaChevronRight 
// } from 'react-icons/fa';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// // ==============
// // UI Components
// // ==============

// const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
//   <motion.div
//     className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl overflow-hidden ${className}`}
//     whileHover={{ y: -5 }}
//     transition={{ type: "spring", stiffness: 400 }}
//   >
//     {children}
//   </motion.div>
// );

// const GradientText = ({ children }: { children: React.ReactNode }) => (
//   <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
//     {children}
//   </span>
// );

// // ==============
// // Main Components
// // ==============

// const Sidebar = () => {
//   const [activeLink, setActiveLink] = useState('/startup/dashboard');
//   const links = [
//     { href: '/startup/dashboard', icon: <BarChart size={18} />, label: 'Dashboard' },
//      { href: '/startup/Profile', icon: <User size={18} />, label: 'Profile' },
//     { href: '/startup/Chat', icon: <MessageCircle size={18} />, label: 'Messages' },
//     { href: '/startup/search', icon: <Search size={18} />, label: 'Find Investors' },
//     { href: '/startup/SmartBot', icon: <Upload size={18} />, label: 'AI Assistant' },
//     { href: '/startup/UploadsPage', icon: <DollarSign size={18} />, label: 'Documents' },
//     { href: '/startup/Investormatches', icon: <Users size={18} />, label: 'Investor Matches' },
//     { href: '/startup/ProposalSubmission', icon: <FileText size={18} />, label: 'Proposals' },
//     { href: '/startup/IdeaDisplay', icon: <FileText size={18} />, label: 'Pitch Viewer' },
//     { href: '/startup/calendar', icon: <Calendar size={18} />, label: 'Calendar' },
    
//     { href: '/startup/notification', icon: <Bell size={18} />, label: 'Notifications' },
    
//     { href: '/startup/fundingneed', icon: <FileText size={18} />, label: 'fundingneeds' },
//      { href: '/startup/settings', icon: <Settings size={18} />, label: 'Settings' },
//     { href: '/startup/HelpAndSupport', icon: <HelpCircle size={18} />, label: 'Help Center' },
//   ];

//   return (
//     <div className="w-72 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 flex flex-col border-r border-gray-700">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="mb-8"
//       >
//         <h1 className="text-2xl font-bold text-white">
//           <GradientText>Startup</GradientText> Portal
//         </h1>
//         <p className="text-sm text-gray-400 mt-1">Accelerate your growth</p>
//       </motion.div>

//       <nav className="flex-1">
//         <ul className="space-y-1">
//           {links.map((link) => (
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
//       <div className="flex items-center space-x-4">
//         <motion.div
//           className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md"
//           whileHover={{ rotate: 10 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           {user?.full_name?.charAt(0) || "S"}
//         </motion.div>
//         <div>
//           <h2 className="font-medium text-gray-800">Welcome back,</h2>
//           <p className="font-semibold text-gray-900">{user?.full_name || "Founder"}</p>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4">
//          <Link href="/startup/notification">
//         <motion.button
//           className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <FaBell className="text-gray-600" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//         </motion.button>
// </Link>


//         <Link href="/startup/gamification">
//           <motion.button
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <FaTrophy className="text-yellow-500" />
//           </motion.button>
//         </Link>

//         <div className="relative">
//           <motion.button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             whileHover={{ scale: 1.02 }}
//           >
//             <span className="font-medium text-gray-700">{user?.full_name || "User"}</span>
//             <FaChevronDown className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
//           </motion.button>

//           <AnimatePresence>
//             {isDropdownOpen && (
//               <motion.div
//                 className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-gray-200"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <div className="p-4 border-b">
//                   <p className="font-medium">{user?.full_name || "User"}</p>
//                   <p className="text-sm text-gray-500 truncate">{user?.email || "No email"}</p>
//                 </div>
//                 <div className="p-1">
//                   <Link href="/startup/settings">
//                     <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
//                       Account Settings
//                     </button>
//                   </Link>
//                   <button
//                     onClick={onLogOutClick}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm flex items-center text-red-500"
//                   >
//                     <FaSignOutAlt className="mr-2" />
//                     Logout
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DashboardCards = () => {
//   const cards = [
//     {
//       title: "Pitch Analytics",
//       icon: <FiBarChart className="w-8 h-8 text-blue-600" />,
//       description: "Track engagement with your pitch decks",
//       color: "from-blue-100 to-blue-50"
//     },
//     {
//       title: "Funding Strategy",
//       icon: <FiLayers className="w-8 h-8 text-purple-600" />,
//       description: "Optimize your fundraising approach",
//       color: "from-purple-100 to-purple-50"
//     },
//     {
//       title: "Growth Metrics",
//       icon: <FiDatabase className="w-8 h-8 text-green-600" />,
//       description: "Monitor key performance indicators",
//       color: "from-green-100 to-green-50"
//     },
//     {
//       title: "Investor Updates",
//       icon: <FiPlayCircle className="w-8 h-8 text-yellow-600" />,
//       description: "Manage your investor communications",
//       color: "from-yellow-100 to-yellow-50"
//     },
//     {
//       title: "Notifications",
//       icon: <FiClock className="w-8 h-8 text-red-600" />,
//       description: "Stay on top of important updates",
//       color: "from-red-100 to-red-50"
//     },
//     {
//       title: "AI Recommendations",
//       icon: <FiTrendingUp className="w-8 h-8 text-indigo-600" />,
//       description: "Personalized growth suggestions",
//       color: "from-indigo-100 to-indigo-50"
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {cards.map((card, index) => (
//         <GlassCard key={index}>
//           <div className={`p-6 bg-gradient-to-br ${card.color} h-full flex flex-col`}>
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-lg bg-white shadow-sm mr-4">
//                 {card.icon}
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
//             </div>
//             <p className="text-gray-600 mb-6">{card.description}</p>
//             <div className="mt-auto">
//               {/* <motion.button
//                 className="px-4 py-2 bg-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
//                 whileHover={{ x: 5 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 View Details
//               </motion.button> */}
//             </div>
//           </div>
//         </GlassCard>
//       ))}
//     </div>
//   );
// };

// const MetricsOverview = () => {
//   const metrics = [
//     { name: "Investor Views", value: "1,248", change: "+12%", trend: "up" },
//     { name: "Pitch Opens", value: "892", change: "+5%", trend: "up" },
//     { name: "Connections", value: "56", change: "+23%", trend: "up" },
//     { name: "Funds Raised", value: "$245K", change: "-2%", trend: "down" },
//   ];

//   return (
//     <GlassCard className="mx-6 mb-6">
//       <div className="p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Overview</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {metrics.map((metric, index) => (
//             <motion.div
//               key={index}
//               className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
//               whileHover={{ y: -3 }}
//             >
//               <p className="text-sm text-gray-500">{metric.name}</p>
//               <div className="flex items-end mt-2">
//                 <p className="text-2xl font-bold text-gray-800 mr-2">{metric.value}</p>
//                 <span className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
//                   {metric.change}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </GlassCard>
//   );
// };

// const StartupDashboard = () => {
//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Topbar />
//         <main className="flex-1 overflow-y-auto">
//           <MetricsOverview />
//           <DashboardCards />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default StartupDashboard;


"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, MessageCircle, User, Search, Upload, 
  DollarSign, Users, FileText, Calendar, 
  Settings, Bell, HelpCircle,Briefcase
} from 'lucide-react';
import { 
  FiBarChart, FiTrendingUp, FiLayers, 
  FiDatabase, FiPlayCircle, FiClock 
} from "react-icons/fi";
import { 
  FaTrophy, FaBell, FaCog, FaSignOutAlt, 
  FaChevronDown, FaChevronRight, FaRobot
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ==============
// UI Components
// ==============

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl overflow-hidden ${className}`}
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    {children}
  </motion.div>
);

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
    {children}
  </span>
);

// ==============
// Main Components
// ==============

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('/startup/dashboard');
  const links = [
    { href: '/startup/dashboard', icon: <BarChart size={18} />, label: 'Dashboard' },
    { href: '/startup/Profile', icon: <User size={18} />, label: 'Profile' },
    { href: '/startup/search', icon: <Search size={18} />, label: 'Find Investors' },
    { href: '/startup/Chat', icon: <MessageCircle size={18} />, label: 'Messages' },
  { href: '/startup/ProposalSubmission', icon: <Briefcase size={18} />, label: 'Proposals' },
  { href: '/startup/IdeaDisplay', icon: <FileText size={18} />, label: 'Pitch Viewer' },
    { href: '/startup/SmartBot', icon: <Upload size={18} />, label: 'AI Assistant' },
    { href: '/startup/UploadsPage', icon: <DollarSign size={18} />, label: 'Documents' },
    { href: '/startup/Investormatches', icon: <Users size={18} />, label: 'Investor Matches' },
    { href: '/startup/fundingneed', icon: <FileText size={18} />, label: 'fundingneeds' },
    
    { href: '/startup/calendar', icon: <Calendar size={18} />, label: 'Calendar' },
    { href: '/startup/notification', icon: <Bell size={18} />, label: 'Notifications' },
    
    { href: '/startup/settings', icon: <Settings size={18} />, label: 'Settings' },
    { href: '/startup/HelpAndSupport', icon: <HelpCircle size={18} />, label: 'Help Center' },
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
          <GradientText>Startup</GradientText> Portal
        </h1>
        <p className="text-sm text-gray-400 mt-1">Accelerate your growth</p>
      </motion.div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {links.map((link) => (
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
      <div className="flex items-center space-x-4">
        <motion.div
          className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md"
          whileHover={{ rotate: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          {user?.full_name?.charAt(0) || "S"}
        </motion.div>
        <div>
          <h2 className="font-medium text-gray-800">Welcome back,</h2>
          <p className="font-semibold text-gray-900">{user?.full_name || "Founder"}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/startup/notification">
          <motion.button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBell className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>
        </Link>

        <Link href="/startup/gamification">
          <motion.button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTrophy className="text-yellow-500" />
          </motion.button>
        </Link>

        <div className="relative">
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <span className="font-medium text-gray-700">{user?.full_name || "User"}</span>
            <FaChevronDown className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-4 border-b">
                  <p className="font-medium">{user?.full_name || "User"}</p>
                  <p className="text-sm text-gray-500 truncate">{user?.email || "No email"}</p>
                </div>
                <div className="p-1">
                  <Link href="/startup/settings">
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const DashboardCards = () => {
  const cards = [
    {
      title: "Pitch Analytics",
      icon: <FiBarChart className="w-8 h-8 text-blue-600" />,
      description: "Track engagement with your pitch decks",
      color: "from-blue-100 to-blue-50"
    },
    {
      title: "Funding Strategy",
      icon: <FiLayers className="w-8 h-8 text-purple-600" />,
      description: "Optimize your fundraising approach",
      color: "from-purple-100 to-purple-50"
    },
    {
      title: "Growth Metrics",
      icon: <FiDatabase className="w-8 h-8 text-green-600" />,
      description: "Monitor key performance indicators",
      color: "from-green-100 to-green-50"
    },
    {
      title: "Investor Updates",
      icon: <FiPlayCircle className="w-8 h-8 text-yellow-600" />,
      description: "Manage your investor communications",
      color: "from-yellow-100 to-yellow-50"
    },
    {
      title: "Notifications",
      icon: <FiClock className="w-8 h-8 text-red-600" />,
      description: "Stay on top of important updates",
      color: "from-red-100 to-red-50"
    },
    {
      title: "AI Recommendations",
      icon: <FiTrendingUp className="w-8 h-8 text-indigo-600" />,
      description: "Personalized growth suggestions",
      color: "from-indigo-100 to-indigo-50"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card, index) => (
        <GlassCard key={index}>
          <div className={`p-6 bg-gradient-to-br ${card.color} h-full flex flex-col`}>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-white shadow-sm mr-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
            </div>
            <p className="text-gray-600 mb-6">{card.description}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

const MetricsOverview = () => {
  // const metrics = [
  //   { name: "Investor Views", value: "1,248", change: "+12%", trend: "up" },
  //   { name: "Pitch Opens", value: "892", change: "+5%", trend: "up" },
  //   { name: "Connections", value: "56", change: "+23%", trend: "up" },
  //   { name: "Funds Raised", value: "$245K", change: "-2%", trend: "down" },
  // ];

  return (
    <GlassCard className="mx-6 mb-6">
      {/* <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              whileHover={{ y: -3 }}
            >
              <p className="text-sm text-gray-500">{metric.name}</p>
              <div className="flex items-end mt-2">
                <p className="text-2xl font-bold text-gray-800 mr-2">{metric.value}</p>
                <span className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}
    </GlassCard>
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
    <GlassCard className="mx-6 mb-6">
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
            <h2 className="text-2xl font-bold text-gray-800">AI-Powered VentureLink Insights</h2>
            <p className="text-sm text-gray-500">Latest market trends and recommendations</p>
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
                <span>Generate new insights</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

const StartupDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <MetricsOverview />
          <AiNews />
          <DashboardCards />
        </main>
      </div>
    </div>
  );
};

export default StartupDashboard;