

// 'use client'; // Ensure this is a client-side component

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaFilePdf, FaImage } from 'react-icons/fa'; // File-type icons
// import { motion } from 'framer-motion'; // Animation library

// interface FileData {
//   id: number;
//   name: string;
//   description: string;
//   category: string;
//   file_path: string; // Path to the file (image or PDF)
//   sector: string; // Sector information
// }

// const StartupIdeaDisplay: React.FC = () => {
//   const [fileData, setFileData] = useState<FileData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [currentFile, setCurrentFile] = useState<FileData | null>(null);

//   useEffect(() => {
//     const fetchFileData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/getallFiles');
//         console.log('Fetched File Data:', response.data.data);

//         // Filter only files where sector is 'Startup'
//         const startupFiles = response.data.data.filter(
//           (file: FileData) => file.sector?.toLowerCase() === 'startup'
//         );

//         console.log('Filtered Startup Files:', startupFiles);
//         setFileData(startupFiles);
//       } catch (err) {
//         console.error('Error fetching file data:', err);
//         setError('Error fetching file data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFileData();
//   }, []);

//   const openModal = (file: FileData) => {
//     setCurrentFile(file);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentFile(null);
//   };

//   if (loading) {
//     return <div className="text-center text-xl font-semibold text-blue-600 animate-pulse">Loading files...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 font-bold">{error}</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {fileData.length === 0 ? (
//           <div className="col-span-full text-center text-gray-500">No files to display</div>
//         ) : (
//           fileData.map((file) => (
//             <motion.div
//               key={file.id}
//               className="bg-white shadow-2xl rounded-2xl overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="p-6 space-y-4">
//                 <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300">{file.name}</h3>
//                 <p className="text-gray-700">{file.description}</p>
//                 <p className="text-gray-500 text-sm">Category: <span className="font-semibold">{file.category}</span></p>
//                 <p className="text-gray-500 text-sm">Sector: <span className="font-semibold">{file.sector}</span></p>
//                 <button
//                   onClick={() => openModal(file)}
//                   className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 mt-4"
//                 >
//                   View {file.file_path.endsWith('.pdf') ? 'PDF' : 'Image'} <FaFilePdf className="inline ml-2" />
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </motion.div>

//       {/* Modal for file display */}
//       {isModalOpen && currentFile && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-white rounded-2xl p-8 w-full max-w-3xl">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-3xl font-semibold text-gray-800">{currentFile.name}</h3>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 text-3xl hover:text-gray-700 focus:outline-none"
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="space-y-4">
//               {currentFile.file_path && currentFile.file_path.endsWith('.pdf') ? (
//                 <embed
//                   src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
//                   width="100%"
//                   height="500px"
//                   type="application/pdf"
//                   className="rounded-lg"
//                 />
//               ) : currentFile.file_path ? (
//                 <img
//                   src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
//                   alt={currentFile.name}
//                   className="w-full h-auto rounded-lg"
//                 />
//               ) : (
//                 <div className="text-center text-gray-500">No file available</div>
//               )}
//             </div>
//             <button
//               onClick={closeModal}
//               className="mt-6 py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StartupIdeaDisplay;





// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaFilePdf, FaStar, FaDownload, FaUserPlus } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// interface FileData {
//   id: number;
//   name: string;
//   description: string;
//   category: string;
//   file_path: string;
//   sector: string;
//   rating: number;
// }

// const IdeaDisplay: React.FC = () => {
//   const [fileData, setFileData] = useState<FileData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [currentFile, setCurrentFile] = useState<FileData | null>(null);
//   const [ratings, setRatings] = useState<{ [key: number]: number }>({});

//   // Retrieve the user ID from localStorage
//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     const fetchFileData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/getallFiles');
//         console.log('current user id:', userId);
//         const investorFiles = response.data.data.filter(
//           (file: FileData) => file.sector?.toLowerCase() === 'startup'
//         );

//         const ratingsResponse = await axios.get('http://localhost:5000/api/getRatings');
//         const ratingsData = ratingsResponse.data;

//         const updatedFiles = investorFiles.map((file: FileData) => {
//           const fileRating = ratingsData[file.id] || 0;
//           return { ...file, rating: fileRating };
//         });

//         setFileData(updatedFiles);
//         setRatings(ratingsData);
//       } catch (err) {
//         setError('Error fetching file data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFileData();
//   }, []);

//   const openModal = (file: FileData) => {
//     setCurrentFile(file);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentFile(null);
//   };

//   const handleDownload = (filePath: string) => {
//     window.open(`http://localhost:5000/api/uploads/${filePath}`, '_blank');
//   };

//   const handleRating = async (fileId: number, rating: number) => {
//     setRatings((prevRatings) => {
//       const updatedRatings = { ...prevRatings, [fileId]: rating };

//       if (!userId) {
//         return prevRatings; // Return previous ratings if no userId
//       }

//       axios
//         .post('http://localhost:5000/api/upload-rating', { id: fileId, rating, userId })
//         .then((response) => {
//           console.log('Rating updated successfully:', response.data);
//         })
//         .catch((error) => {
//           console.error('Error submitting rating:', error);
//         });

//       return updatedRatings;
//     });
//   };

//   const handleConnect = async (uploadId: number, receiverId: number) => {
//     const senderId = localStorage.getItem('user_id');
  
//     if (!senderId) {
//       alert('Please log in first.');
//       return;
//     }
  
//     try {
//       const res = await axios.post('http://localhost:5000/api/update-status', {
//         uploadId,
//         userId: parseInt(senderId), // sender
//         targetUserId: receiverId,   // receiver
//         status: 'requested',
//       });
  
//       alert('Connection request sent successfully!');
//       console.log('Response:', res.data);
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request. Try again.');
//     }
//   };
  
  
  
//   // Example JSX rendering the connect button:
//   const FileComponent = ({ fileId }: { fileId: number }) => {
//     return (
//       <div>
//         <button onClick={() => handleConnect(fileId)}>Connect</button>
//       </div>
//     );
//   };
  
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-lg font-medium text-gray-700">Loading files...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
//           <p className="font-bold">Error</p>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {fileData.length === 0 ? (
//           <div className="col-span-full text-center py-12">
//             <div className="bg-gray-50 rounded-xl p-8 inline-block">
//               <svg
//                 className="w-16 h-16 mx-auto text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <h3 className="mt-4 text-lg font-medium text-gray-900">No files to display</h3>
//               <p className="mt-1 text-sm text-gray-500">Check back later for new uploads.</p>
//             </div>
//           </div>
//         ) : (
//           fileData.map((file) => (
//             <motion.div
//               key={file.id}
//               className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
//               whileHover={{ y: -5 }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="p-6 space-y-4 h-full flex flex-col">
//                 <div>
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
//                       {file.name}
//                     </h3>
//                     <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                       {file.category}
//                     </div>
//                   </div>
//                   <p className="mt-2 text-gray-600 text-sm line-clamp-3">{file.description}</p>
//                 </div>

//                 <div className="mt-auto">
//                   <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//                     <span className="bg-gray-100 px-3 py-1 rounded-full">
//                       {file.sector}
//                     </span>
//                     <span className="flex items-center">
//                       {ratings[file.id] ? (
//                         <>
//                           <FaStar className="text-yellow-400 mr-1" />
//                           {ratings[file.id].toFixed(1)}
//                         </>
//                       ) : (
//                         'Not rated'
//                       )}
//                     </span>
//                   </div>

//                   {/* Interactive Rating */}
//                   <div className="mb-4">
//                     <p className="text-xs text-gray-500 mb-1">Rate this idea:</p>
//                     <div className="flex items-center gap-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           onClick={() => handleRating(file.id, star)}
//                           className="focus:outline-none"
//                         >
//                           <FaStar
//                             className={`text-xl transition-colors ${
//                               ratings[file.id] >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
//                             }`}
//                           />
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => openModal(file)}
//                       className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
//                     >
//                       <FaFilePdf />
//                       <span>View {file.file_path.endsWith('.pdf') ? 'PDF' : 'File'}</span>
//                     </button>
//                     <button
//                       onClick={() => handleDownload(file.file_path)}
//                       className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
//                     >
//                       <FaDownload />
//                       <span>Download</span>
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => handleConnect(file.id)}
//                     className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
//                   >
//                     <FaUserPlus />
//                     <span>Connect</span>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </motion.div>

//       {/* Modal */}
//       {isModalOpen && currentFile && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
//           <motion.div
//             className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//           >
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <h3 className="text-xl font-semibold text-gray-900">{currentFile.name}</h3>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-400 hover:text-gray-500 focus:outline-none"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="p-4 overflow-auto flex-grow">
//               {currentFile.file_path && currentFile.file_path.endsWith('.pdf') ? (
//                 <embed
//                   src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
//                   width="100%"
//                   height="100%"
//                   type="application/pdf"
//                   className="min-h-[60vh] rounded-lg border border-gray-200"
//                 />
//               ) : currentFile.file_path ? (
//                 <img
//                   src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
//                   alt={currentFile.name}
//                   className="w-full h-auto rounded-lg border border-gray-200 object-contain max-h-[70vh] mx-auto"
//                 />
//               ) : (
//                 <div className="text-center py-12">
//                   <svg
//                     className="w-16 h-16 mx-auto text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1}
//                       d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <h3 className="mt-4 text-lg font-medium text-gray-900">File not available</h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     The requested file could not be loaded.
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="p-4 border-t border-gray-200 flex justify-end">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IdeaDisplay;


// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaFilePdf, FaStar, FaDownload, FaUserPlus } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// interface FileData {
//   id: number;
//   name: string;
//   description: string;
//   category: string;
//   file_path: string;
//   sector: string;
//   rating: number;
// }

// const IdeaDisplay: React.FC = () => {
//   const [fileData, setFileData] = useState<FileData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [currentFile, setCurrentFile] = useState<FileData | null>(null);
//   const [ratings, setRatings] = useState<{ [key: number]: number }>({});

//   // Retrieve the user ID from localStorage
//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     const fetchFileData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/getallFiles');
//         console.log('current user id:', userId);
//         const investorFiles = response.data.data.filter(
//           (file: FileData) => file.sector?.toLowerCase() === 'startup'
//         );

//         const ratingsResponse = await axios.get('http://localhost:5000/api/getRatings');
//         const ratingsData = ratingsResponse.data;

//         const updatedFiles = investorFiles.map((file: FileData) => {
//           const fileRating = ratingsData[file.id] || 0;
//           return { ...file, rating: fileRating };
//         });

//         setFileData(updatedFiles);
//         setRatings(ratingsData);
//       } catch (err) {
//         setError('Error fetching file data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFileData();
//   }, []);

//   const openModal = (file: FileData) => {
//     setCurrentFile(file);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentFile(null);
//   };

//   const handleDownload = (filePath: string) => {
//     window.open(`http://localhost:5000/api/uploads/${filePath}`, '_blank');
//   };

//   const handleRating = async (fileId: number, rating: number) => {
//     setRatings((prevRatings) => {
//       const updatedRatings = { ...prevRatings, [fileId]: rating };

//       if (!userId) {
//         return prevRatings; // Return previous ratings if no userId
//       }

//       axios
//         .post('http://localhost:5000/api/upload-rating', { id: fileId, rating, userId })
//         .then((response) => {
//           console.log('Rating updated successfully:', response.data);
//         })
//         .catch((error) => {
//           console.error('Error submitting rating:', error);
//         });

//       return updatedRatings;
//     });
//   };

//   const handleConnect = async (uploadId: number, receiverId: number) => {
//     const senderId = localStorage.getItem('user_id');
  
//     if (!senderId) {
//       alert('Please log in first.');
//       return;
//     }
  
//     try {
//       const res = await axios.post('http://localhost:5000/api/update-status', {
//         uploadId,
//         userId: parseInt(senderId), // sender
//         targetUserId: receiverId,   // receiver
//         status: 'Requested',
//       });
  
//       alert('Connection request sent successfully!');
//       console.log('Response:', res.data);
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request. Try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-lg font-medium text-gray-700">Loading files...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md rounded-lg shadow-md">
//           <p className="font-bold">Error</p>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {fileData.length === 0 ? (
//           <div className="col-span-full text-center py-12">
//             <motion.div 
//               className="bg-white rounded-xl shadow-lg p-8 inline-block max-w-md"
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <svg
//                 className="w-16 h-16 mx-auto text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <h3 className="mt-4 text-lg font-medium text-gray-900">No files to display</h3>
//               <p className="mt-1 text-sm text-gray-500">Check back later for new uploads.</p>
//             </motion.div>
//           </div>
//         ) : (
//           fileData.map((file) => (
//             <motion.div
//               key={file.id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
//               whileHover={{ y: -5, scale: 1.02 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="p-6 space-y-4 h-full flex flex-col">
//                 <div>
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
//                       {file.name}
//                     </h3>
//                     <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
//                       {file.category}
//                     </div>
//                   </div>
//                   <p className="mt-3 text-gray-600 text-sm line-clamp-3">{file.description}</p>
//                 </div>

//                 <div className="mt-auto">
//                   <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                     <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
//                       {file.sector}
//                     </span>
//                     <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
//                       <FaStar className="text-yellow-400 mr-1" />
//                       <span className="font-medium">
//                         {ratings[file.id] ? ratings[file.id].toFixed(1) : 'New'}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Interactive Rating */}
//                   <div className="mb-4">
//                     <p className="text-xs text-gray-500 mb-2 font-medium">Rate this idea:</p>
//                     <div className="flex items-center gap-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           onClick={() => handleRating(file.id, star)}
//                           className="focus:outline-none transform hover:scale-110 transition-transform"
//                         >
//                           <FaStar
//                             className={`text-xl transition-colors ${
//                               ratings[file.id] >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
//                             }`}
//                           />
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => openModal(file)}
//                       className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
//                     >
//                       <FaFilePdf className="text-white" />
//                       <span className="font-medium">View {file.file_path.endsWith('.pdf') ? 'PDF' : 'File'}</span>
//                     </button>
//                     <button
//                       onClick={() => handleDownload(file.file_path)}
//                       className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
//                     >
//                       <FaDownload className="text-white" />
//                       <span className="font-medium">Download</span>
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => handleConnect(file.id)}
//                     className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
//                   >
//                     <FaUserPlus className="text-white" />
//                     <span className="font-medium">Connect</span>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </motion.div>

//       {/* Modal */}
//       {isModalOpen && currentFile && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
//           <motion.div
//             className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//           >
//             <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
//               <h3 className="text-xl font-bold text-gray-800">{currentFile.name}</h3>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="p-6 overflow-auto flex-grow bg-gray-50">
//               {currentFile.file_path && currentFile.file_path.endsWith('.pdf') ? (
//                 <embed
//                   src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
//                   width="100%"
//                   height="100%"
//                   type="application/pdf"
//                   className="min-h-[60vh] rounded-lg border border-gray-200 shadow-sm"
//                 />
//               ) : currentFile.file_path ? (
//                 <div className="flex justify-center items-center h-full">
//                   <img
//                     src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
//                     alt={currentFile.name}
//                     className="max-w-full max-h-[70vh] rounded-lg border border-gray-200 object-contain shadow-sm"
//                   />
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <svg
//                     className="w-16 h-16 mx-auto text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1}
//                       d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <h3 className="mt-4 text-lg font-medium text-gray-900">File not available</h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     The requested file could not be loaded.
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="p-4 border-t border-gray-200 flex justify-end bg-gray-50">
//               <button
//                 onClick={closeModal}
//                 className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium shadow-sm"
//               >
//                 Close Preview
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IdeaDisplay;


// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaFilePdf, FaStar, FaDownload, FaUserPlus, FaEllipsisV } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// interface FileData {
//   id: number;
//   name: string;
//   description: string;
//   category: string;
//   file_path: string;
//   sector: string;
//   rating: number;
// }

// const IdeaDisplay: React.FC = () => {
//   const [fileData, setFileData] = useState<FileData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [currentFile, setCurrentFile] = useState<FileData | null>(null);
//   const [ratings, setRatings] = useState<{ [key: number]: number }>({});
//   const [connectionStatus, setConnectionStatus] = useState<{ [key: number]: string }>({});

//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     const fetchFileData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/getallFiles');
//         const investorFiles = response.data.data.filter(
//           (file: FileData) => file.sector?.toLowerCase() === 'startup'
//         );

//         const ratingsResponse = await axios.get('http://localhost:5000/api/getRatings');
//         const ratingsData = ratingsResponse.data;

//         const updatedFiles = investorFiles.map((file: FileData) => {
//           const fileRating = ratingsData[file.id] || 0;
//           return { ...file, rating: fileRating };
//         });

//         setFileData(updatedFiles);
//         setRatings(ratingsData);

//         // Fetch connection status
//         if (userId) {
//           await fetchConnectionStatusByUser();
//         }
//       } catch (err) {
//         setError('Error fetching file data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFileData();
//   }, [userId]);

//   const fetchConnectionStatusByUser = async () => {
//   if (!userId) return;

//   try {
//     const response = await axios.get<{ upload_id: number; status: string }[]>(
//       `http://localhost:5000/api/getConnectionStatusByUser/${userId}`
//     );

//     // Transform the array of results into an object for easy lookup
//     const statusMap: { [uploadId: number]: string } = {};
//     response.data.forEach(({ upload_id, status }) => {
//       statusMap[upload_id] = status;
//     });

//     setConnectionStatus(statusMap);
//   } catch (error) {
//     console.error('Error fetching connection status:', error);
//   }
// };


//   const openModal = (file: FileData) => {
//     setCurrentFile(file);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentFile(null);
//   };

//   const handleDownload = (filePath: string) => {
//     window.open(`http://localhost:5000/api/uploads/${filePath}`, '_blank');
//   };

//   const handleRating = async (fileId: number, rating: number) => {
//     setRatings((prevRatings) => {
//       const updatedRatings = { ...prevRatings, [fileId]: rating };

//       if (!userId) {
//         return prevRatings;
//       }

//       axios
//         .post('http://localhost:5000/api/upload-rating', { id: fileId, rating, userId })
//         .then((response) => {
//           console.log('Rating updated successfully:', response.data);
//         })
//         .catch((error) => {
//           console.error('Error submitting rating:', error);
//         });

//       return updatedRatings;
//     });
//   };

//   const handleConnect = async (uploadId: number, receiverId: number) => {
//     const senderId = localStorage.getItem('user_id');
  
//     if (!senderId) {
//       alert('Please log in first.');
//       return;
//     }
  
//     try {
//       const res = await axios.post('http://localhost:5000/api/update-status', {
//         uploadId,
//         userId: parseInt(senderId),
//         targetUserId: receiverId,
//         status: 'Requested',
//       });
  
//       // Update connection status to 'Requested'
//       setConnectionStatus(prev => ({
//         ...prev,
//         [uploadId]: 'Requested'
//       }));
      
//       alert('Connection request sent successfully! Please wait for the founder to accept your request.');
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request. Try again.');
//     }
//   };

//   const getConnectionButtonText = (fileId: number) => {
//     const status = connectionStatus[fileId];
//     switch (status) {
//       case 'Accepted':
//         return 'Connected';
//       case 'Requested':
//         return 'Request Sent';
//       case 'Rejected':
//         return 'Request Declined';
//       default:
//         return 'Connect with Founder';
//     }
//   };

//   const getConnectionButtonStyle = (fileId: number) => {
//     const status = connectionStatus[fileId];
//     switch (status) {
//       case 'Accepted':
//         return 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500';
//       case 'Requested':
//         return 'text-gray-700 bg-yellow-100 hover:bg-yellow-200 focus:ring-yellow-500 cursor-default';
//       case 'Rejected':
//         return 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500';
//       default:
//         return 'text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="text-center space-y-4">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="text-lg font-medium text-gray-700">Loading investment opportunities...</p>
//           <p className="text-sm text-gray-500">Discovering the best ideas for you</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
//           <div className="bg-red-100 inline-flex p-3 rounded-full">
//             <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h3 className="mt-4 text-lg font-medium text-gray-900">Loading Error</h3>
//           <p className="mt-2 text-sm text-gray-500">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Opportunities</h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Discover and connect with innovative business ideas and potential partners
//           </p>
//         </div>

//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {fileData.length === 0 ? (
//             <div className="col-span-full">
//               <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//                 <div className="mx-auto h-24 w-24 text-gray-400">
//                   <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="mt-4 text-lg font-medium text-gray-900">No opportunities available</h3>
//                 <p className="mt-2 text-sm text-gray-500">Check back later for new investment ideas.</p>
//               </div>
//             </div>
//           ) : (
//             fileData.map((file) => (
//               <motion.div
//                 key={file.id}
//                 className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col"
//                 whileHover={{ y: -5 }}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="p-5 flex-grow">
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-lg font-semibold text-gray-900 truncate">{file.name}</h3>
//                       <p className="mt-1 text-sm text-gray-500">{file.category}</p>
//                     </div>
//                     <button className="text-gray-400 hover:text-gray-500">
//                       <FaEllipsisV className="h-5 w-5" />
//                     </button>
//                   </div>
                  
//                   <p className="mt-3 text-gray-600 text-sm line-clamp-3">{file.description}</p>
                  
//                   <div className="mt-4 flex items-center justify-between">
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {file.sector}
//                     </span>
//                     <div className="flex items-center">
//                       <FaStar className="text-yellow-400 mr-1" />
//                       <span className="text-sm font-medium text-gray-700">
//                         {ratings[file.id] ? ratings[file.id].toFixed(1) : 'New'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
//                   <div className="mb-3">
//                     <p className="text-xs font-medium text-gray-500 mb-1">Rate this opportunity</p>
//                     <div className="flex space-x-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           onClick={() => handleRating(file.id, star)}
//                           className="focus:outline-none"
//                         >
//                           <FaStar
//                             className={`h-5 w-5 transition-colors ${
//                               ratings[file.id] >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
//                             }`}
//                           />
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 gap-3">
//                     {connectionStatus[file.id] !== 'Accepted' ? (
//                       // Show Connect button with different states
//                       <button
//                         onClick={() => {
//                           if (connectionStatus[file.id] === 'Requested' || connectionStatus[file.id] === 'Rejected') {
//                             return; // Don't allow clicking if already requested or rejected
//                           }
//                           handleConnect(file.id, parseInt(userId || '0'));
//                         }}
//                         disabled={connectionStatus[file.id] === 'Requested'}
//                         className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${getConnectionButtonStyle(file.id)}`}
//                       >
//                         <FaUserPlus className="mr-2" />
//                         {getConnectionButtonText(file.id)}
//                       </button>
//                     ) : (
//                       // Show View PDF and Download buttons only when connection is Accepted
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-center mb-2">
//                           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                             Connection Accepted
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-2 gap-3">
//                           <button
//                             onClick={() => openModal(file)}
//                             className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                           >
//                             <FaFilePdf className="mr-2" />
//                             View PDF
//                           </button>
//                           <button
//                             onClick={() => handleDownload(file.file_path)}
//                             className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                           >
//                             <FaDownload className="mr-2" />
//                             Download
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </motion.div>
//       </div>

//       {/* Modern Modal */}
//       {isModalOpen && currentFile && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//               <div 
//                 className="absolute inset-0 bg-gray-500 bg-opacity-75"
//                 onClick={closeModal}
//               ></div>
//             </div>

//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

//             <motion.div
//               className="inline-block align-bottom bg-white rounded-t-xl sm:rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//             >
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg leading-6 font-medium text-gray-900">
//                         {currentFile.name}
//                       </h3>
//                       <button
//                         onClick={closeModal}
//                         className="text-gray-400 hover:text-gray-500 focus:outline-none"
//                       >
//                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </div>
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-500">{currentFile.description}</p>
//                     </div>
//                     <div className="mt-4">
//                       {currentFile.file_path && currentFile.file_path.endsWith('.pdf') ? (
//                         <div className="h-96">
//                           <embed
//                             src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
//                             width="100%"
//                             height="100%"
//                             type="application/pdf"
//                             className="rounded-lg border border-gray-200"
//                           />
//                         </div>
//                       ) : currentFile.file_path ? (
//                         <img
//                           src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
//                           alt={currentFile.name}
//                           className="w-full h-auto rounded-lg border border-gray-200 object-contain max-h-[70vh] mx-auto"
//                         />
//                       ) : (
//                         <div className="text-center py-12">
//                           <svg
//                             className="w-16 h-16 mx-auto text-gray-400"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="1"
//                               d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                           <h3 className="mt-4 text-lg font-medium text-gray-900">File not available</h3>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   onClick={() => handleDownload(currentFile.file_path)}
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
//                 >
//                   <FaDownload className="mr-2 h-5 w-5" />
//                   Download
//                 </button>
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IdeaDisplay;

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFilePdf, FaStar, FaDownload, FaUserPlus, FaEllipsisV } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FileData {
  id: number;
  name: string;
  description: string;
  category: string;
  file_path: string;
  sector: string;
  rating: number;
  user_id: number;
}

const IdeaDisplay: React.FC = () => {
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<FileData | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [connectionStatus, setConnectionStatus] = useState<{ [key: string]: boolean | string }>({});
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    message: ''
  });

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallFiles');
        const investorFiles = response.data.data.filter(
          (file: FileData) => file.sector?.toLowerCase() === 'startup'
        );

        const ratingsResponse = await axios.get('http://localhost:5000/api/getRatings');
        const ratingsData = ratingsResponse.data;

        const updatedFiles = investorFiles.map((file: FileData) => {
          const fileRating = ratingsData[file.id] || 0;
          return { ...file, rating: fileRating };
        });

        setFileData(updatedFiles);
        setRatings(ratingsData);

        if (userId) {
          await fetchConnectionStatusByUser();
        }
      } catch (err) {
        setError('Error fetching file data');
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, [userId]);

  const fetchConnectionStatusByUser = async () => {
    if (!userId) return;

    try {
      const response = await axios.get<{ upload_id: number; status: string }[]>(
        `http://localhost:5000/api/getConnectionStatusByUser/${userId}`
      );

      const statusMap: { [key: string]: string } = {};
      response.data.forEach(({ upload_id, status }) => {
        statusMap[`status-${upload_id}`] = status;
      });

      setConnectionStatus(statusMap);
    } catch (error) {
      console.error('Error fetching connection status:', error);
    }
  };

  const openModal = (file: FileData) => {
    setCurrentFile(file);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFile(null);
  };

  const handleDownload = (filePath: string) => {
    window.open(`http://localhost:5000/api/uploads/${filePath}`, '_blank');
  };

  const handleRating = async (fileId: number, rating: number) => {
    setRatings((prevRatings) => {
      const updatedRatings = { ...prevRatings, [fileId]: rating };

      if (!userId) {
        return prevRatings;
      }

      axios
        .post('http://localhost:5000/api/upload-rating', { id: fileId, rating, userId })
        .then((response) => {
          console.log('Rating updated successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error submitting rating:', error);
        });

      return updatedRatings;
    });
  };

  const handleConnect = async (uploadId: number, receiverId: number) => {
    const senderId = localStorage.getItem('user_id');
  
    if (!senderId) {
      alert('Please log in first.');
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/update-status', {
        uploadId,
        userId: parseInt(senderId),
        targetUserId: receiverId,
        status: 'Requested',
      });

      await axios.post('http://localhost:5000/api/send-notification', {
        sender_id: parseInt(senderId),
        receiver_id: receiverId,
        upload_id: uploadId,
        message: `You have a new connection request from user ${senderId}`,
        type: 'connection_request',
        status: 'unread'
      });
  
      setConnectionStatus(prev => ({
        ...prev,
        [`status-${uploadId}`]: 'Requested'
      }));
      
      alert('Connection request sent successfully! The founder will be notified.');
    } catch (err) {
      console.error('Error sending request:', err);
      alert('Failed to send request. Try again.');
    }
  };

  const handleScheduleMeeting = async (fileId: number, fileOwnerId: number) => {
    if (!scheduleData.date || !scheduleData.time) {
      alert('Please select date and time for the meeting');
      return;
    }

    try {
      const senderId = localStorage.getItem('user_id');
      if (!senderId) {
        alert('Please log in first.');
        return;
      }

      await axios.post('http://localhost:5000/api/send-notification', {
        sender_id: parseInt(senderId),
        receiver_id: fileOwnerId,
        upload_id: fileId,
        message: `Meeting scheduled for ${scheduleData.date} at ${scheduleData.time}`,
        type: 'meeting_request',
        status: 'unread',
        metadata: JSON.stringify({
          date: scheduleData.date,
          time: scheduleData.time,
          message: scheduleData.message || '',
          upload_id: fileId
        })
      });

      alert('Meeting request sent successfully!');
      setConnectionStatus(prev => ({
        ...prev,
        [`dropdown-${fileId}`]: false
      }));
      setScheduleData({
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Failed to schedule meeting. Try again.');
    }
  };

  const getConnectionButtonText = (fileId: number) => {
    const status = connectionStatus[`status-${fileId}`];
    switch (status) {
      case 'Accepted':
        return 'Connected';
      case 'Requested':
        return 'Request Sent';
      case 'Rejected':
        return 'Request Declined';
      default:
        return 'Connect with Founder';
    }
  };

  const getConnectionButtonStyle = (fileId: number) => {
    const status = connectionStatus[`status-${fileId}`];
    switch (status) {
      case 'Accepted':
        return 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500';
      case 'Requested':
        return 'text-gray-700 bg-yellow-100 hover:bg-yellow-200 focus:ring-yellow-500 cursor-default';
      case 'Rejected':
        return 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500';
      default:
        return 'text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">Loading investment opportunities...</p>
          <p className="text-sm text-gray-500">Discovering the best ideas for you</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="bg-red-100 inline-flex p-3 rounded-full">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Loading Error</h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Opportunities</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover and connect with innovative business ideas and potential partners
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {fileData.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No opportunities available</h3>
                <p className="mt-2 text-sm text-gray-500">Check back later for new investment ideas.</p>
              </div>
            </div>
          ) : (
            fileData.map((file) => (
              <motion.div
                key={file.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-start relative">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{file.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{file.category}</p>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setConnectionStatus((prev) => ({
                            ...prev,
                            [`dropdown-${file.id}`]: !prev[`dropdown-${file.id}`],
                          }))
                        }
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FaEllipsisV className="h-5 w-5" />
                      </button>

                      {connectionStatus[`dropdown-${file.id}`] && (
                        <div className="absolute z-50 right-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b">
                              <h4 className="font-medium">Schedule Meeting</h4>
                              <div className="mt-2 space-y-2">
                                <input
                                  type="date"
                                  value={scheduleData.date}
                                  onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                                  className="w-full p-1 border rounded text-sm"
                                  min={new Date().toISOString().split('T')[0]}
                                />
                                <input
                                  type="time"
                                  value={scheduleData.time}
                                  onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                                  className="w-full p-1 border rounded text-sm"
                                />
                                <textarea
                                  placeholder="Optional message"
                                  value={scheduleData.message}
                                  onChange={(e) => setScheduleData({...scheduleData, message: e.target.value})}
                                  className="w-full p-1 border rounded text-sm"
                                  rows={2}
                                />
                              </div>
                              <button
                                onClick={() => handleScheduleMeeting(file.id, file.user_id)}
                                className="mt-2 w-full bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700"
                              >
                                Send Request
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-600 text-sm line-clamp-3">{file.description}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {file.sector}
                    </span>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-700">
                        {ratings[file.id] ? ratings[file.id].toFixed(1) : 'New'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">Rate this opportunity</p>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(file.id, star)}
                          className="focus:outline-none"
                        >
                          <FaStar
                            className={`h-5 w-5 transition-colors ${
                              ratings[file.id] >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {connectionStatus[`status-${file.id}`] === 'Accepted' ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center mb-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Connection Accepted
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => openModal(file)}
                            className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          >
                            <FaFilePdf className="mr-2" />
                            View PDF
                          </button>
                          <button
                            onClick={() => handleDownload(file.file_path)}
                            className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          >
                            <FaDownload className="mr-2" />
                            Download
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (connectionStatus[`status-${file.id}`] === 'Requested' || connectionStatus[`status-${file.id}`] === 'Rejected') {
                            return;
                          }
                          handleConnect(file.id, file.user_id);
                        }}
                        disabled={connectionStatus[`status-${file.id}`] === 'Requested'}
                        className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${getConnectionButtonStyle(file.id)}`}
                      >
                        <FaUserPlus className="mr-2" />
                        {getConnectionButtonText(file.id)}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {isModalOpen && currentFile && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div 
                className="absolute inset-0 bg-gray-500 bg-opacity-75"
                onClick={closeModal}
              ></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <motion.div
              className="inline-block align-bottom bg-white rounded-t-xl sm:rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {currentFile.name}
                      </h3>
                      <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{currentFile.description}</p>
                    </div>
                    <div className="mt-4">
                      {currentFile.file_path && currentFile.file_path.endsWith('.pdf') ? (
                        <div className="h-96">
                          <embed
                            src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
                            width="100%"
                            height="100%"
                            type="application/pdf"
                            className="rounded-lg border border-gray-200"
                          />
                        </div>
                      ) : currentFile.file_path ? (
                        <img
                          src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
                          alt={currentFile.name}
                          className="w-full h-auto rounded-lg border border-gray-200 object-contain max-h-[70vh] mx-auto"
                        />
                      ) : (
                        <div className="text-center py-12">
                          <svg
                            className="w-16 h-16 mx-auto text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <h3 className="mt-4 text-lg font-medium text-gray-900">File not available</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleDownload(currentFile.file_path)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                >
                  <FaDownload className="mr-2 h-5 w-5" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaDisplay;