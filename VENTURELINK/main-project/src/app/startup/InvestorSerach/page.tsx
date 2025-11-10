// src/app/startup/dashboard/InvestorSearchPage.tsx
import React from "react";
import InvestorSearch from "@/components/Dashboard/startup/investor-search"; // Make sure the import name matches the exported component

const InvestorSearchPage: React.FC = () => {
    return (
        <div className="investor-search-page">
            {/* Render the InvestorSearch component here */}
            <InvestorSearch />
        </div>
    );
};

export default InvestorSearchPage;
