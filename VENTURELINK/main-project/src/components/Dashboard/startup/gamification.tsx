// 'use client'; // This marks the component as a Client Component

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion'; // Animation library
// import { FaTrophy, FaStar, FaMedal } from 'react-icons/fa'; // Icons for achievements

// const GamificationPage = () => {
//   const [user, setUser] = useState<any | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Simulate fetching user data or any client-side logic
//   useEffect(() => {
//     const data = localStorage.getItem("users2") ? JSON.parse(localStorage.getItem("users2") ?? "") : null;
//     setUser(data);
//     setLoading(false);
//   }, []);

//   return (
//     <motion.div
//       className="container mx-auto p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-2xl"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       <header className="text-center mb-12">
//         <motion.h1
//           className="text-3xl font-bold tracking-wider"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           Gamification Dashboard
//         </motion.h1>
//         <motion.p
//           className="mt-4 text-lg"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.6 }}
//         >
//           Track your progress, achievements, and climb the leaderboard!
//         </motion.p>
//       </header>

//       {/* User Greeting Section */}
//       <motion.div
//         className="text-center mb-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1, duration: 0.8 }}
//       >
//         {loading ? (
//           <p className="text-xl">Loading your data...</p>
//         ) : (
//           <div>
//             <p className="text-xl">Welcome back, {user?.full_name || "Investor"}! 🎉</p>
//             <p className="text-md mt-2">Progress: {user?.progress || 0}% Completed</p>
//           </div>
//         )}
//       </motion.div>

//       {/* Achievements Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         <AchievementCard
//           icon={<FaTrophy />}
//           title="Top Achiever"
//           description="Awarded for the highest level of progress."
//           delay={0.1}
//         />
//         <AchievementCard
//           icon={<FaMedal />}
//           title="Achievement Unlocked"
//           description="Earned for reaching specific milestones."
//           delay={0.3}
//         />
//         <AchievementCard
//           icon={<FaStar />}
//           title="Star Performer"
//           description="Given for continuous excellence."
//           delay={0.5}
//         />
//       </div>

//       {/* Progress Bar */}
//       <motion.div
//         className="mt-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.8, duration: 0.6 }}
//       >
//         <h3 className="text-xl mb-4">Your Progress</h3>
//         <div className="w-full bg-gray-200 rounded-full h-4">
//           <motion.div
//             className="bg-green-500 h-4 rounded-full"
//             style={{ width: `${user?.progress || 50}%` }}
//             transition={{ type: 'spring', stiffness: 200, damping: 25 }}
//           />
//         </div>
//       </motion.div>

//       {/* Leaderboard Section */}
//       <motion.div
//         className="mt-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2, duration: 0.6 }}
//       >
//         <h3 className="text-2xl font-semibold mb-6">Leaderboard</h3>
//         <ul className="bg-white p-6 rounded-lg shadow-lg">
//           {['John Doe', 'Jane Smith', 'Mark Johnson'].map((name, index) => (
//             <li
//               key={index}
//               className="flex justify-between items-center p-4 border-b last:border-b-0"
//             >
//               <span className="text-gray-700">{name}</span>
//               <span className="text-gray-500">Level {index + 1}</span>
//             </li>
//           ))}
//         </ul>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Reusable Achievement Card Component
// const AchievementCard = ({ icon, title, description, delay }: any) => {
//   return (
//     <motion.div
//       className="bg-white text-gray-800 p-6 rounded-xl shadow-lg text-center"
//       initial={{ scale: 0.8 }}
//       animate={{ scale: 1 }}
//       transition={{ type: 'spring', stiffness: 300, delay }}
//     >
//       <div className="text-4xl text-yellow-400 mb-4">{icon}</div>
//       <h4 className="text-xl font-semibold mb-2">{title}</h4>
//       <p className="text-sm">{description}</p>
//     </motion.div>
//   );
// };

// export default GamificationPage;


// Leaderboard.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaCrown, FaMedal, FaTrophy } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface FileData {
  id: number;
  name: string;
  description: string;
  category: string;
  file_path: string;
  sector: string;
  rating: number;
}

const LeaderboardDisplay: React.FC = () => {
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const [filesResponse, ratingsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/getallFiles'),
          axios.get('http://localhost:5000/api/getRatings')
        ]);

        const investorFiles = filesResponse.data.data.filter(
          (file: FileData) => file.sector?.toLowerCase() === 'startup'
        );

        const ratingsData = ratingsResponse.data;
        const updatedFiles = investorFiles.map((file: FileData) => ({
          ...file,
          rating: ratingsData[file.id] || 0
        }));

        const sortedFiles = updatedFiles.sort((a, b) => b.rating - a.rating);
        setFileData(sortedFiles);
        setRatings(ratingsData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, []);

  const handleRating = async (fileId: number, rating: number) => {
    try {
      setRatings(prev => ({ ...prev, [fileId]: rating }));
      await axios.post('http://localhost:5000/api/upload-rating', { id: fileId, rating });
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <FaCrown className="text-yellow-500 text-xl" />;
      case 1: return <FaMedal className="text-gray-400 text-xl" />;
      case 2: return <FaTrophy className="text-amber-600 text-xl" />;
      default: return <span className="font-medium">{index + 1}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-3 text-lg font-medium text-gray-700">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 p-6 rounded-lg max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-red-800">Error</h3>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl overflow-hidden border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FaTrophy className="mr-2" /> Startup Files Leaderboard
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Top rated investment opportunities based on community ratings
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {fileData.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                      No investment files available
                    </td>
                  </motion.tr>
                ) : (
                  fileData.map((file, index) => (
                    <motion.tr
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`hover:bg-gray-50 ${index < 3 ? 'bg-gradient-to-r from-blue-50 to-white' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
                            {getRankIcon(index)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                        <div className="text-sm text-gray-500">{file.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => handleRating(file.id, star)}
                                className="focus:outline-none"
                              >
                                <FaStar
                                  className={`h-5 w-5 transition-all ${ratings[file.id] >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300 hover:text-yellow-300'}`}
                                />
                              </button>
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {ratings[file.id]?.toFixed(1) || '0.0'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                            index < 3 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {index === 0 ? 'Top Pick' : index < 3 ? 'Highly Rated' : 'Rated'}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {fileData.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{fileData.length}</span> investment opportunities
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Download Report
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                  View All
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">How Ratings Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="flex items-center mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">5 Stars</span>
            </div>
            <p className="text-sm text-gray-600">Exceptional investment opportunity with high potential returns</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="flex items-center mr-2">
                {[1, 2, 3, 4].map((star) => (
                  <FaStar key={star} className="h-4 w-4 text-yellow-400" />
                ))}
                <FaStar className="h-4 w-4 text-gray-300" />
              </div>
              <span className="text-sm font-medium">4 Stars</span>
            </div>
            <p className="text-sm text-gray-600">Strong opportunity with room for improvement</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="flex items-center mr-2">
                {[1, 2, 3].map((star) => (
                  <FaStar key={star} className="h-4 w-4 text-yellow-400" />
                ))}
                <div className="flex items-center space-x-1">
                  <FaStar className="h-4 w-4 text-gray-300" />
                </div>
              </div>
              <span className="text-sm font-medium">3 Stars</span>
            </div>
            <p className="text-sm text-gray-600">Good investment but may have some risks or weaknesses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardDisplay;
