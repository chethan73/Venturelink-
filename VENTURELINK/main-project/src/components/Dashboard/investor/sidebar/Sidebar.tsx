// src/components/dashboard/investor/sidebar/Sidebar.tsx
import Link from 'next/link'; // Import Link for routing
import { BarChart, Briefcase, Search, User } from 'lucide-react'; // Example icons

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-800 p-4 w-64 h-screen text-white">
      <ul>
        {/* Dashboard Link */}
        <li>
          <Link href="/dashboard">
            <a className="flex items-center p-4 hover:bg-indigo-500 rounded-lg">
              <BarChart className="mr-3" size={24} />
              Dashboard
            </a>
          </Link>
        </li>

        {/* Investment Link */}
        <li>
          <Link href="/investment">
            <a className="flex items-center p-4 hover:bg-indigo-500 rounded-lg">
              <Briefcase className="mr-3" size={24} />
              Investments
            </a>
          </Link>
        </li>

        {/* Investment Details Link */}
        <li>
          <Link href="/investmentdetails">
            <a className="flex items-center p-4 hover:bg-indigo-500 rounded-lg">
              <Briefcase className="mr-3" size={24} />
              Investment Details
            </a>
          </Link>
        </li>

        {/* Search Link */}
        <li>
          <Link href="/search">
            <a className="flex items-center p-4 hover:bg-indigo-500 rounded-lg">
              <Search className="mr-3" size={24} />
              Search
            </a>
          </Link>
        </li>

        {/* Profile Link */}
        <li>
          <Link href="/profile">
            <a className="flex items-center p-4 hover:bg-indigo-500 rounded-lg">
              <User className="mr-3" size={24} />
              Profile
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
