// src/app/startup/dashboard/PitchDeckPage.tsx
import React from "react";
import Notification from "@/components/Dashboard/startup/notification";

const Notifications: React.FC = () => {
    return (
        <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notification</h1>
            
            <Notification />
        </div>
    );
};

export default Notifications;
