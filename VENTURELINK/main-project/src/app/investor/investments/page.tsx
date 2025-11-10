// // import React from 'react';
// import Dashboard from "@/components/Dashboard/investor/Dashboard";

// const DashboardPage = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <Dashboard />
//     </div>
//   );
// };

// export default DashboardPage;

import React from 'react';
import Investments from '@/components/Dashboard/investor/Investments'; // Correct import path

const InvestmentsPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Investments Page</h1>
      <Investments />
    </div>
  );
};

export default InvestmentsPage;
