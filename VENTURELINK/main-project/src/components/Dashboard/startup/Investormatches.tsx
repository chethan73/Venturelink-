
// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Match {
//   id: string;
//   user_id: string;
//   name: string;
//   category: string;
//   funding_range: string;
//   description: string;
//   sector: string;
//   calculated_value: number;
//   rating: number;
//   file_path: string;
//   uploaded_at: string;
//   api_key?: string;
// }

// const InvestorMatchmakingPage = () => {
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [apiKey, setApiKey] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch user ID from local storage or any other source
//     const storedUser = localStorage.getItem('user_id');
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setUserId(user.id); // Accessing the 'id' property from the parsed user object
//     setUserId('user_id'); setUserId('Not Available');
//     }

//     // Fetching the matches data
//     const fetchMatches = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:8000/api/matchmaking/investor');
//         console.log('Fetched Matches:', response.data);

//         setMatches(response.data);

//         if (response.data.length > 0) {
//           const currentUser = response.data[0];
//           setApiKey(currentUser.api_key || 'Not Available');
//         }
//       } catch (error: any) {
//         console.error('Error fetching matches:', error.message || error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, []);

//   const handleConnect = async (targetUploadId: string, targetUserId: string) => {
//     if (!userId) {
//       alert('User ID not available. Cannot send connect request.');
//       return;
//     }

//     const payload = {
//       user_id: userId,
//       target_upload_id: targetUploadId,
//       status: 'pending',
//     };

//     console.log('Sending connect payload:', payload); // Debugging: Check user_id, target_upload_id
//     console.log(`Current User ID: ${userId}`);
//     console.log(`Target User ID: ${targetUserId}`);

//     try {
//       const response = await axios.post('http://localhost:5000/api/connect', payload);
//       if (response.status === 201) {
//         alert('Connect request sent successfully!');
//       } else {
//         alert('Failed to send connect request.');
//       }
//     } catch (error: any) {
//       console.error('Error sending connect request:', error.response?.data || error.message);
//       alert('An error occurred while sending the connect request.');
//     }
//   };

//   const handleUpdateConnectionStatus = async (connectionId: string, status: string) => {
//     if (!['pending', 'accepted', 'rejected'].includes(status)) {
//       alert('Invalid status. Please choose from "pending", "accepted", or "rejected".');
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:5000/api/connect/${connectionId}`, { status });
//       if (response.status === 200) {
//         alert(`Connection status updated to: ${status}`);
//       } else {
//         alert('Failed to update connection status.');
//       }
//     } catch (error: any) {
//       console.error('Error updating connection status:', error.response?.data || error.message);
//       alert('An error occurred while updating the connection status.');
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-8">
//       <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Investor Matchmaking</h1>

//       {userId && (
//         <div className="mb-8 p-6 rounded-xl shadow-md bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200">
//           <p className="text-lg font-medium text-gray-700"><strong>Current User ID:</strong> {userId}</p>
//           <p className="text-lg font-medium text-gray-700"><strong>API Key:</strong> {apiKey}</p>
//         </div>
//       )}

//       {loading ? (
//         <div className="text-center text-lg text-gray-600">Loading matchmaking data...</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {matches.map((match, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
//             >
//               <h2 className="text-2xl font-semibold text-blue-800 mb-2">{match.name}</h2>
//               <p className="text-gray-600 mb-2">{match.description}</p>
//               <div className="space-y-1 text-sm text-gray-700">
//                 <p><strong>Category:</strong> {match.category}</p>
//                 <p><strong>Funding Range:</strong> {match.funding_range}</p>
//                 <p><strong>Sector:</strong> {match.sector}</p>
//                 <p><strong>Calculated Value:</strong> {match.calculated_value}</p>
//                 <p><strong>User ID:</strong> {match.user_id}</p>
//                 <p><strong>Rating:</strong> {match.rating}</p>
//                 <p><strong>File Path:</strong> {match.file_path}</p>
//                 <p><strong>Uploaded At:</strong> {match.uploaded_at}</p>
//                 {match.api_key && (
//                   <p><strong>API Key:</strong> {match.api_key}</p>
//                 )}
//               </div>

//               <div className="mt-4 text-right">
//                 <button
//                   className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:scale-105 transition-transform"
//                   onClick={() => handleConnect(match.id, match.user_id)} // Pass match.id and match.user_id
//                 >
//                   Connect
//                 </button>
//               </div>

//               {/* Buttons for updating the connection status */}
//               <div className="mt-4 flex justify-between">
//                 <button
//                   className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow"
//                   onClick={() => handleUpdateConnectionStatus(match.id, 'accepted')}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow"
//                   onClick={() => handleUpdateConnectionStatus(match.id, 'rejected')}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvestorMatchmakingPage;







// 'use client';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Investormatches = () => {
//   const categories = ['IT', 'Healthcare', 'Finance', 'Marketing'];
//   const fundingOptions = [
//     '₹1L - ₹5L',
//     '₹5L - ₹10L',
//     '₹10L - ₹25L',
//     '₹25L - ₹50L',
//     '₹50L - ₹1Cr',
//     '₹1Cr+',
//   ];

//   const [matches, setMatches] = useState<any[]>([]);  // All data from the backend
//   const [filteredMatches, setFilteredMatches] = useState<any[]>([]);  // Filtered data based on selected category and funding range
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [investorId, setInvestorId] = useState<number | null>(null);  // Investor ID state
//   const [investorData, setInvestorData] = useState<any>(null); // Store fetched investor details

//   const [selectedCategory, setSelectedCategory] = useState<string>(''); // Selected category for filtering
//   const [selectedFundingRange, setSelectedFundingRange] = useState<string>(''); // Selected funding range for filtering

//   useEffect(() => {
//     // Automatically fetch investor data based on logged-in user or default
//     const fetchInvestorData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Example: Fetch investor details (replace with real logic)
//         const response = await axios.get('http://localhost:8000/api/investor'); // Adjust the URL to your actual API for fetching investor data
//         if (response.data) {
//           const investor = response.data;
//           setInvestorData(investor);
//           setInvestorId(investor.id); // Set the investor ID from the fetched data

//           // Automatically fetch the matches based on the investor's data
//           fetchMatches(investor.id); // Pass the fetched investor ID
//         } else {
//           setError('Investor data not found');
//         }
//       } catch (err) {
//         setError('Error fetching investor data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvestorData();
//   }, []); // Empty dependency array to fetch data on component mount

//   const fetchMatches = async (investorId: number) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`http://localhost:8000/matches/investor/${investorId}`);
//       if (response.data && Array.isArray(response.data.matches)) {
//         setMatches(response.data.matches); // Set all matches for this investor
//         setFilteredMatches(response.data.matches); // Initially display all matches
//       } else {
//         setMatches([]);  // If no matches found
//         setFilteredMatches([]);  // No matches found
//       }
//     } catch (err) {
//       setError('Error fetching matches');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const category = event.target.value;
//     setSelectedCategory(category);
//     filterData(category, selectedFundingRange);
//   };

//   const handleFundingRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const fundingRange = event.target.value;
//     setSelectedFundingRange(fundingRange);
//     filterData(selectedCategory, fundingRange);
//   };

//   const filterData = (category: string, fundingRange: string) => {
//     let filtered = matches;

//     if (category) {
//       filtered = filtered.filter((match) => match.category === category);
//     }

//     if (fundingRange) {
//       filtered = filtered.filter((match) => match.funding_range === fundingRange);
//     }

//     setFilteredMatches(filtered);
//   };

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       <div>
//         <div>
//           <label htmlFor="category">Category: </label>
//           <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
//             <option value="">Select Category</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="fundingRange">Funding Range: </label>
//           <select
//             id="fundingRange"
//             value={selectedFundingRange}
//             onChange={handleFundingRangeChange}
//           >
//             <option value="">Select Funding Range</option>
//             {fundingOptions.map((range, index) => (
//               <option key={index} value={range}>
//                 {range}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           {filteredMatches.length > 0 ? (
//             <ul>
//               {filteredMatches.map((match, index) => (
//                 <li key={index}>
//                   <strong>{match.name}</strong> - {match.category} - {match.funding_range}
//                   <p>{match.description}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No matches found based on the selected filters.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Investormatches;


// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Match {
//   id: string;
//   name: string;
//   description: string;
//   sector: string;
//   category: string;
//   fundingneeds: string;
//   funding_range: string;
//   similarity?: number;
// }

// interface ComparisonResult {
//   similarity: number;
//   explanation?: string;
// }

// const BASE_URL = "http://localhost:8000/api";

// export default function MatchmakingPage() {
//   const [userId, setUserId] = useState("");
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [compareId1, setCompareId1] = useState("");
//   const [compareId2, setCompareId2] = useState("");
//   const [comparison, setComparison] = useState<ComparisonResult | null>(null);
//   const [myFiles, setMyFiles] = useState<Match[]>([]);
//   const [otherFiles, setOtherFiles] = useState<Match[]>([]);

//   const fetchMatches = async () => {
//     if (!userId) return;
//     try {
//       const res = await axios.get(`${BASE_URL}/matchmaking/${userId}`);
//       setMatches(res.data);
//     } catch (err) {
//       console.error("Error fetching matches:", err);
//     }
//   };

//   const compareUsers = async () => {
//     if (!compareId1 || !compareId2) return;
//     try {
//       const res = await axios.get(`${BASE_URL}/compare/${compareId1}/${compareId2}`);
//       setComparison(res.data);
//     } catch (err) {
//       console.error("Error comparing users:", err);
//     }
//   };

//   const fetchMyFiles = async () => {
//     if (!userId) return;
//     try {
//       const res = await axios.get(`${BASE_URL}/files/${userId}`);
//       setMyFiles(res.data);
//     } catch (err) {
//       console.error("Error fetching user's own files:", err);
//     }
//   };

//   const fetchOtherFiles = async () => {
//     if (!userId) return;
//     try {
//       const res = await axios.get(`${BASE_URL}/files/others/${userId}`);
//       setOtherFiles(res.data);
//     } catch (err) {
//       console.error("Error fetching other users' files:", err);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-12">
//       <h1 className="text-3xl font-bold text-center">AI-Powered Matchmaking</h1>

//       {/* Matchmaking Section */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold">Find Matches</h2>
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             placeholder="Enter User ID"
//             className="border p-2 rounded w-64"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//           />
//           <button
//             onClick={fetchMatches}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Find Matches
//           </button>
//         </div>
//         {matches.length > 0 && (
//           <ul className="space-y-3">
//             {matches.map((match) => (
//               <li key={match.id} className="border p-4 rounded bg-white shadow">
//                 <p><strong>Name:</strong> {match.name}</p>
//                 <p><strong>Description:</strong> {match.description}</p>
//                 <p><strong>Sector:</strong> {match.sector}</p>
//                 <p><strong>Category:</strong> {match.category}</p>
//                 <p><strong>Funding Needs:</strong> {match.fundingneeds}</p>
//                 <p><strong>Funding Range:</strong> {match.funding_range}</p>
//                 <p><strong>Similarity:</strong> {(match.similarity ?? 0).toFixed(3)}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Compare Two Users */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold">Compare Two Users</h2>
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             placeholder="User ID 1"
//             className="border p-2 rounded w-32"
//             value={compareId1}
//             onChange={(e) => setCompareId1(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="User ID 2"
//             className="border p-2 rounded w-32"
//             value={compareId2}
//             onChange={(e) => setCompareId2(e.target.value)}
//           />
//           <button
//             onClick={compareUsers}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Compare
//           </button>
//         </div>
//         {comparison && (
//           <div className="p-4 border rounded shadow bg-gray-50">
//             <p>
//               <strong>Similarity Score:</strong> {comparison.similarity.toFixed(3)}
//             </p>
//             {comparison.explanation && (
//               <p><strong>Explanation:</strong> {comparison.explanation}</p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* File Retrieval Section */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold">User Files</h2>
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="Enter your User ID"
//             className="border p-2 rounded w-64"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//           />
//           <button
//             onClick={fetchMyFiles}
//             className="bg-indigo-500 text-white px-4 py-2 rounded"
//           >
//             Get My Files
//           </button>
//           <button
//             onClick={fetchOtherFiles}
//             className="bg-purple-500 text-white px-4 py-2 rounded"
//           >
//             Get Others' Files
//           </button>
//         </div>

//         {/* My Files */}
//         <div>
//           <h3 className="text-lg font-semibold mt-4">My Uploaded Files</h3>
//           {myFiles.length === 0 ? (
//             <p className="text-gray-500">No files uploaded yet.</p>
//           ) : (
//             <ul className="space-y-2">
//               {myFiles.map((file, idx) => (
//                 <li key={idx} className="border p-3 rounded bg-white shadow">
//                   <p><strong>Name:</strong> {file.name}</p>
//                   <p><strong>Sector:</strong> {file.sector}</p>
//                   <p><strong>Category:</strong> {file.category}</p>
//                   <p><strong>Funding Needs:</strong> {file.fundingneeds}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Other Files */}
//         <div>
//           <h3 className="text-lg font-semibold mt-4">Other Users’ Files</h3>
//           {otherFiles.length === 0 ? (
//             <p className="text-gray-500">No matching files found.</p>
//           ) : (
//             <ul className="space-y-2">
//               {otherFiles.map((file, idx) => (
//                 <li key={idx} className="border p-3 rounded bg-white shadow">
//                   <p><strong>Name:</strong> {file.name}</p>
//                   <p><strong>Sector:</strong> {file.sector}</p>
//                   <p><strong>Category:</strong> {file.category}</p>
//                   <p><strong>Funding Needs:</strong> {file.fundingneeds}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrendingUp, FiPieChart, FiBarChart2, FiDollarSign, FiCheckCircle, FiRefreshCw } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [myFiles, setMyFiles] = useState<any[]>([]);
  const [otherFiles, setOtherFiles] = useState<any[]>([]);
  const [selectedMyFile, setSelectedMyFile] = useState<any | null>(null);
  const [selectedOtherFile, setSelectedOtherFile] = useState<any | null>(null);
  const [comparisonResult, setComparisonResult] = useState<any | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem("user_id");

  // Fetch current user's files
  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/api/files/${userId}`)
      .then((res) => {
        setMyFiles(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("My Files error:", err);
        setIsLoading(false);
      });
  }, [userId]);

  // Fetch other users' files
  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/api/files/others/${userId}`)
      .then((res) => {
        setOtherFiles(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Other Files error:", err);
        setIsLoading(false);
      });
  }, [userId]);

  // Compare selected files
  const handleCompare = async () => {
    if (!selectedMyFile || !selectedOtherFile) return;
    
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/compare/${selectedMyFile.user_id}/${selectedOtherFile.user_id}`
      );
      setComparisonResult(res.data);
    } catch (err) {
      console.error("Comparison error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get recommendations
  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/recommendations/${userId}`);
      setRecommendations(res.data);
    } catch (err) {
      console.error("Recommendations error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiTrendingUp className="mr-3 text-blue-600" />
              Investor Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Analyze and compare Startup opportunities
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button 
              onClick={fetchRecommendations}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FiRefreshCw className="mr-2" />
              Refresh Data
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* My Investments */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden col-span-1"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <FiPieChart className="mr-2" />
                My Portfolio
              </h2>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {myFiles.map((file) => (
                    <motion.li
                      key={file.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMyFile(file)}
                      className={`cursor-pointer p-4 rounded-xl transition-all ${
                        selectedMyFile?.id === file.id
                          ? "bg-blue-50 border-2 border-blue-300 shadow-md"
                          : "hover:bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800">{file.name}</h3>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          ${file.fundingneeds}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FiCheckCircle className="mr-1 text-green-500" />
                        {file.category}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>

          {/* Market Opportunities */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden col-span-1"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <FiBarChart2 className="mr-2" />
                Market Opportunities
              </h2>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {otherFiles.map((file) => (
                    <motion.li
                      key={file.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedOtherFile(file)}
                      className={`cursor-pointer p-4 rounded-xl transition-all ${
                        selectedOtherFile?.id === file.id
                          ? "bg-green-50 border-2 border-green-300 shadow-md"
                          : "hover:bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800">{file.name}</h3>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          ${file.fundingneeds}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FiDollarSign className="mr-1 text-yellow-500" />
                        {file.category}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>

          {/* Comparison Panel */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden col-span-1 lg:col-span-1"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <FiTrendingUp className="mr-2" />
                Analysis Tools
              </h2>
            </div>
            <div className="p-6">
              <button
                onClick={handleCompare}
                disabled={!selectedMyFile || !selectedOtherFile || isLoading}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center transition-all duration-300 mb-6 ${
                  !selectedMyFile || !selectedOtherFile || isLoading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <FiBarChart2 className="mr-2" />
                    Compare Investments
                  </>
                )}
              </button>

              <AnimatePresence>
                {comparisonResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 overflow-hidden"
                  >
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" />
                      Comparison Results
                    </h3>
                    <div className="text-sm text-gray-600 font-mono bg-white p-3 rounded-lg overflow-x-auto">
                      <pre>{JSON.stringify(comparisonResult, null, 2)}</pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        {/* <AnimatePresence>
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiTrendingUp className="mr-2" />
                  Recommended Investments
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendations.map((rec, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <FiDollarSign className="text-indigo-600" />
                      </div>
                      <h3 className="font-medium text-gray-800">{rec.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        Category: {rec.category}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        Funding: ${rec.fundingneeds}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
        {/* Recommendations */}
<AnimatePresence>
  {recommendations.length > 0 && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 text-white">
        <h2 className="text-xl font-semibold flex items-center">
          <FiTrendingUp className="mr-2" />
          Recommended Investments
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((rec, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <FiDollarSign className="text-indigo-600" />
              </div>
              <h3 className="font-medium text-gray-800">{rec.name}</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Category: {rec.category}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                Funding: ${rec.fundingneeds}
              </div>
            </div>
            {/* View Details Button */}
            <button
              className="mt-2 w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 px-4 rounded transition"
              onClick={() => router.push(`/startup/IdeaDisplay`)
}
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </div>
  );
};

export default Dashboard;