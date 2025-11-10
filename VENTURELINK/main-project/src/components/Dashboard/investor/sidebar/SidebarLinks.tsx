// Path: src/components/dashboard/investor/sidebar/SidebarLinks.tsx
import { motion } from 'framer-motion';
import Link from 'next/link'; // Importing Link for Next.js routing
import { BarChart, User, Briefcase, Search } from 'lucide-react'; // Example icons

const SidebarLinks = () => {
  return (
    <ul className="space-y-6">
      {/* Dashboard Link */}
      <Link href="/dashboard">
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-indigo-500 rounded-xl"
        >
          <BarChart className="mr-3 text-white" size={24} />
          <span className="text-xl">Dashboard</span>
        </motion.li>
      </Link>

      {/* Investments Link */}
      <Link href="/investment">
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-indigo-500 rounded-xl"
        >
          <Briefcase className="mr-3 text-white" size={24} />
          <span className="text-xl">Investments</span>
        </motion.li>
      </Link>

      {/* Investment Details Link */}
      <Link href="/investmentdetails">
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-indigo-500 rounded-xl"
        >
          <Briefcase className="mr-3 text-white" size={24} />
          <span className="text-xl">Investment Details</span>
        </motion.li>
      </Link>

      {/* Search Link */}
      <Link href="/search">
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-indigo-500 rounded-xl"
        >
          <Search className="mr-3 text-white" size={24} />
          <span className="text-xl">Search</span>
        </motion.li>
      </Link>

      {/* Profile Link */}
      <Link href="/profile">
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-indigo-500 rounded-xl"
        >
          <User className="mr-3 text-white" size={24} />
          <span className="text-xl">Profile</span>
        </motion.li>
      </Link>
    </ul>
  );
};

export default SidebarLinks;
