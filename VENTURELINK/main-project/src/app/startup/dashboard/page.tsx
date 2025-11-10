// import Profile from 'components/Dashboard/investor/Profile';

// const ProfilePage = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
//       <Profile />
//     </div>
//   );
// };

// export default ProfilePage;

// src/app/startup/dashboard/page.tsx
import React from 'react';
import DashboardPage from "@/components/Dashboard/startup/DashboardPage";

const StartupDashboard: React.FC = () => {
  return (
    <div className="startup-dashboard-page">
      {/* Render the DashboardPage component */}
      <DashboardPage />
    </div>
  );
};

export default StartupDashboard;
