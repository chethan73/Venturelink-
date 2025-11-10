// src/app/startup/dashboard/PitchDeckPage.tsx
import React from "react";
import PitchDeckComponent from "@/components/Dashboard/startup/PitchDeck";

const PitchDeckPage: React.FC = () => {
    return (
        <div className="pitch-deck-page">
            {/* Render the PitchDeckComponent here */}
            <PitchDeckComponent />
        </div>
    );
};

export default PitchDeckPage;
