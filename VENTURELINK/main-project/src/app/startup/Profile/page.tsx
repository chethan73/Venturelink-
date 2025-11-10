// src/app/startup/dashboard/ProfilePage.tsx
import React from "react";
import ProfileComponent from "@/components/Dashboard/startup/Profile";

const ProfilePage: React.FC = () => {
    return (
        <div className="profile-page">
            {/* Render the ProfileComponent here */}
            <ProfileComponent />
        </div>
    );
};

export default ProfilePage;
