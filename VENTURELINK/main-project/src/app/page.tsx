'use client';

import React, { useState } from 'react'; // Import React hooks if needed
// import HomePage from "../components/home/HomePage";
import Dashboard from "../components/Dashboard/dashboard";
import HomePage from '@/components/home/HomePage';

const Page: React.FC = () => {
  // Set a condition to toggle between HomePage and Dashboard
  const [showDashboard, setShowDashboard] = useState(true);

  return (
    <main>
      {showDashboard ? <HomePage/> : <Dashboard />}
    </main>
  );
};

export default Page;
