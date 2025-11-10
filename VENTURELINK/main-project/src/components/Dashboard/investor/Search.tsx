// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaSearch, FaSpinner, FaUser, FaComments, FaFileAlt } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";

// interface Startup {
//   user_id: string;
//   full_name: string;
//   role: string;
//   sector: string;
// }

// interface Investor {
//   user_id: string;
//   full_name: string;
//   role: string;
//   sector: string;
// }

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [investors, setInvestors] = useState<Investor[]>([]);
//   const [filteredResults, setFilteredResults] = useState<Investor[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);

//   useEffect(() => {
//     const fetchInvestors = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/getall");
//         const investorUsers = response.data.data.filter((user: startup) => user.role === "startup");
//         setInvestors(investorUsers);
//         setFilteredResults(investorUsers);
//       } catch (error) {
//         console.error("Error fetching startup:", error);
//         setError("Failed to fetch investors");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInvestors();
//   }, []);

//   useEffect(() => {
//     if (query.trim() === "") {
//       setFilteredResults(investors);
//     } else {
//       const results = investors.filter((investor) =>
//         investor.full_name.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredResults(results);
//     }
//   }, [query, investors]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex justify-center items-start">
//       <div className="max-w-4xl w-full">
//         {/* Search Header */}
//         <motion.div 
//           className="mb-8 text-center"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover Startups</h1>
//           <p className="text-gray-500">Find and connect with promising startups in your network</p>
//         </motion.div>

//         {/* Search Box */}
//         <motion.div 
//           className="relative mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search by name, sector, or keywords..."
//               className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-300 text-gray-700"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </motion.div>

//         {/* Results Section */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Status Indicators */}
//           {loading && (
//             <div className="flex justify-center items-center p-8">
//               <FaSpinner className="animate-spin text-blue-500 text-2xl mr-3" />
//               <span className="text-gray-500">Loading startups...</span>
//             </div>
//           )}

//           {error && (
//             <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg mx-6 my-4">
//               {error}
//             </div>
//           )}

//           {/* Results Grid */}
//           {filteredResults.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
//               {filteredResults.map((investor, idx) => (
//                 <motion.div
//                   key={investor.id}
//                   className="bg-white border border-gray-100 rounded-lg p-5 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: idx * 0.05 }}
//                   onClick={() => setSelectedInvestor(investor)}
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <div className="flex items-start space-x-4">
//                     <div className="bg-blue-100 p-3 rounded-full">
//                       <FaUser className="text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-800">{investor.full_name}</h3>
//                       <p className="text-sm text-gray-500 mt-1">{investor.sector}</p>
//                       <div className="mt-3 flex space-x-2">
//                         <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">Verified</span>
//                         <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">Active</span>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             !loading && (
//               <div className="p-12 text-center">
//                 <div className="text-gray-400 mb-4">No matching startups found</div>
//                 <button 
//                   className="text-blue-500 hover:text-blue-600 font-medium"
//                   onClick={() => setQuery("")}
//                 >
//                   Clear search
//                 </button>
//               </div>
//             )
//           )}
//         </div>
//       </div>

//       {/* Investor Detail Modal */}
//       <AnimatePresence>
//         {selectedInvestor && (
//           <motion.div 
//             className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4 z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedInvestor(null)}
//           >
//             <motion.div
//               className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Modal Header */}
//               <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
//                 <div className="flex items-center space-x-4">
//                   <div className="bg-white/20 p-3 rounded-full">
//                     <FaUser className="text-xl" />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold">{selectedInvestor.full_name}</h2>
//                     <p className="text-blue-100">{selectedInvestor.sector}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Body */}
//               <div className="p-6">
//                 <div className="mb-6">
//                   <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">About</h3>
//                   <p className="text-gray-600">Connect with this startup to explore potential collaborations and investment opportunities.</p>
//                 </div>

//                 <div className="space-y-3">
//                   <Link
//                     href={`/investor/Messages`}
//                     className="block w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors duration-200"
//                   >
//                     <FaComments />
//                     <span>Start Chat</span>
//                   </Link>

//                   <Link
//                     href={`/investor/InvestorDetails`}
//                     className="block w-full flex items-center justify-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-lg transition-colors duration-200"
//                   >
//                     <FaFileAlt />
//                     <span>View Proposal</span>
//                   </Link>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="border-t border-gray-100 px-6 py-4">
//                 <button
//                   className="w-full text-gray-500 hover:text-gray-700 font-medium py-2"
//                   onClick={() => setSelectedInvestor(null)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Search;


"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaSpinner, FaUser, FaComments, FaFileAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Investor {
  user_id: string;
  full_name: string;
  role: string;
  sector: string;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [filteredResults, setFilteredResults] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInvestors = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/getall");
        const investorUsers = response.data.data.filter((user: startup) => user.role === "Startup");
        setInvestors(investorUsers);
        setFilteredResults(investorUsers);
      } catch (error) {
        console.error("Error fetching investors:", error);
        setError("Failed to fetch investors");
      } finally {
        setLoading(false);
      }
    };
    fetchInvestors();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredResults(investors);
    } else {
      const results = investors.filter((investor) =>
        investor.full_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [query, investors]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex justify-center items-start">
      <div className="max-w-4xl w-full">
        {/* Search Header */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover Investors</h1>
          <p className="text-gray-500">Find and connect with potential investors in your network</p>
        </motion.div>

        {/* Search Box */}
        <motion.div 
          className="relative mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, sector, or keywords..."
              className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-300 text-gray-700"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Status Indicators */}
          {loading && (
            <div className="flex justify-center items-center p-8">
              <FaSpinner className="animate-spin text-blue-500 text-2xl mr-3" />
              <span className="text-gray-500">Loading investors...</span>
            </div>
          )}

          {error && (
            <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg mx-6 my-4">
              {error}
            </div>
          )}

          {/* Results Grid */}
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {filteredResults.map((investor, idx) => (
                <motion.div
                  key={investor.user_id}
                  className="bg-white border border-gray-100 rounded-lg p-5 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={() => setSelectedInvestor(investor)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FaUser className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{investor.full_name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{investor.sector}</p>
                      <div className="mt-3 flex space-x-2">
                        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">Verified</span>
                        <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">Active</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="p-12 text-center">
                <div className="text-gray-400 mb-4">No matching investors found</div>
                <button 
                  className="text-blue-500 hover:text-blue-600 font-medium"
                  onClick={() => setQuery("")}
                >
                  Clear search
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Investor Detail Modal */}
      <AnimatePresence>
        {selectedInvestor && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedInvestor(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <FaUser className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedInvestor.full_name}</h2>
                    <p className="text-blue-100">{selectedInvestor.sector}</p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">About</h3>
                  <p className="text-gray-600">Connect with this investor to explore potential funding opportunities.</p>
                </div>

                <div className="space-y-3">
                  <button
                    className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors duration-200"
                    onClick={() => router.push(`/investor/Messages`)}
                  >
                    <FaComments />
                    <span>Start Chat</span>
                  </button>

                  <button
                    className="w-full flex items-center justify-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-lg transition-colors duration-200"
                    onClick={() => router.push(`/investor/investments`)}
                  >
                    <FaFileAlt />
                    <span>View Proposal</span>
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-100 px-6 py-4">
                <button
                  className="w-full text-gray-500 hover:text-gray-700 font-medium py-2"
                  onClick={() => setSelectedInvestor(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;