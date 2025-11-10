import Shortlisting from "@/components/Dashboard/investor/startupmatch";

const InvestorDashboard = () => {
  const userId = 1; // Logged-in User ID
  const userType: "investor" | "startup" = "investor"; // Change as needed
  const targetId = 5; // Example startup ID to shortlist

  return (
    <div>
      <h1 className="text-2xl font-bold">Investor Dashboard</h1>
      <Shortlisting userId={userId} userType={userType} targetId={targetId} />
    </div>
  );
};

export default InvestorDashboard;
