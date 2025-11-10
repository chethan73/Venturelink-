// import React from 'react';
// import Investments from '@/components/Dashboard/investor/Investments'; // Correct import path

// const InvestmentsPage: React.FC = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Investments Page</h1>
//       <Investments />
//     </div>
//   );
// };

// export default InvestmentsPage;

import React from 'react';
import InvestmentDetailsUpload from '@/components/Dashboard/investor/InvestorDetails';

const InvestmentDetailsPage: React.FC = () => {
  return (
    <div>
      <InvestmentDetailsUpload />
    </div>
  );
};

export default InvestmentDetailsPage;
