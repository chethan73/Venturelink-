// src/app/startup/dashboard/PitchDeckPage.tsx
import React from "react";
import Proposal from "@/components/Dashboard/startup/ProposalSubmission";

const ProposalSubmission: React.FC = () => {
    return (
        <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submission</h1>
            
            <Proposal />
        </div>
    );
};

export default ProposalSubmission;
