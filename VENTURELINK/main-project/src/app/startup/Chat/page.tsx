

// // src/app/startup/dashboard/page.tsx
// import React from 'react';
// import DashboardPage from "@/components/Dashboard/startup/DashboardPage";

// const StartupDashboard: React.FC = () => {
//   return (
//     <div className="startup-dashboard-page">
//       {/* Render the DashboardPage component */}
//       <DashboardPage />
//     </div>
//   );
// };

// export default StartupDashboard;

// src/app/startup/dashboard/messagesPage.tsx
// import React from "react";
// import MessagesPageComponent from "components/Dashboard/startup/Messages";

// const Messages: React.FC = () => {
//     return (
//         <div className="message-page">
//             {/* Render the MessagesPageComponent here */}
//             <MessagesPageComponent />
//         </div>
//     );
// };

// export default Messages;
import Profile from '@/components/Dashboard/startup/Chat';

const MessagesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <Profile />
    </div>
  );
};

export default MessagesPage;
