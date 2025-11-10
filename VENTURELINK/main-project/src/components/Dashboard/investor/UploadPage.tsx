// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { motion } from 'framer-motion';

// interface Upload {
//   id: number;
//   name: string;
//   category: string;
//   sector: string;
//   timestamp: string;
//   file_path: string;
//   user_id: number;
// }

// interface Connection {
//   id: number;
//   user_id: number;
//   upload_id: number;
//   status: string;
//   created_at: string;
//   name: string; // User's name from the users2 table
//   email: string; // User's email from the users2 table
// }

// const UploadsPage = () => {
//   const [uploads, setUploads] = useState<Upload[]>([]);
//   const [connections, setConnections] = useState<Connection[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const userId = localStorage.getItem('user_id');

//   const fetchUploads = async () => {
//     if (!userId) {
//       setError('User ID is not available');
//       return;
//     }

//     try {
//       const res = await axios.get('http://localhost:5000/api/getallFiles12', {
//         params: { user_id: userId },
//       });

//       setUploads(res.data.data || []);
//     } catch (err) {
//       console.error('Error fetching uploads:', err);
//       setError('Error fetching uploads');
//     }
//   };

//   const fetchConnections = async () => {
//     try {
//       // Ensure this matches the route on your backend
//       const response = await axios.get('http://localhost:5000/api/getConnections', {
//         params: { user_id: userId },
//       });

//       // Check if the response is in the expected format
//       if (response.data && response.data.data) {
//         setConnections(response.data.data); // This should be an array of connections
//       } else {
//         console.error('No connections data received.');
//       }
//     } catch (error) {
//       console.error('Error fetching connections:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openPdf = (file: Upload) => {
//     const pdfUrl = `http://localhost:5000/api/uploads/${file.file_path}`;
//     window.open(pdfUrl, '_blank');
//   };

//   const handleDelete = async (id: number) => {
//     const confirm = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'This will permanently delete the file.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/api/deleteFile/${id}/${userId}`);
//         setUploads(prev => prev.filter(upload => upload.id !== id));
//         Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
//       } catch (err) {
//         console.error('Delete error:', err);
//         Swal.fire('Error', 'Failed to delete the file.', 'error');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUploads();
//     fetchConnections();
//   }, [userId]);

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">📂 My Uploaded Files</h2>

//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {uploads.map(file => (
//           <motion.div
//             key={file.id}
//             className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
//             whileHover={{ scale: 1.02 }}
//           >
//             <h3 className="text-lg font-semibold text-blue-700">{file.name}</h3>
//             <p className="text-sm text-gray-600">Sector: {file.sector}</p>
//             <p className="text-sm text-gray-600">Category: {file.category}</p>
//             <div className="mt-4 space-y-2">
//               <button
//                 onClick={() => openPdf(file)}
//                 className="w-full py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 View PDF
//               </button>
//               <button
//                 onClick={() => handleDelete(file.id)}
//                 className="w-full py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-8">👥 My Connection Requests</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {connections.map(connection => (
//           <motion.div
//             key={connection.id}
//             className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
//             whileHover={{ scale: 1.02 }}
//           >
//             <h3 className="text-lg font-semibold text-blue-700">{connection.name}</h3>
//             <p className="text-sm text-gray-600">Email: {connection.email}</p>
//             <p className="text-sm text-gray-600">Status: {connection.status}</p>
//             <p className="text-sm text-gray-600">Created At: {new Date(connection.created_at).toLocaleString()}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };





// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";

// interface Upload {
//   id: number;
//   name: string;
//   category: string;
//   sector: string;
//   timestamp: string;
//   file_path: string;
//   user_id: number;
// }

// interface Connection {
//   id: string;
//   sender_id: string;
//   sender_name: string;
//   upload_id: string;
//   fundingneeds: string;
//   upload_owner_id: string;
//   upload_owner_name: string;
//   status: string;
//   created_at: string;
// }

// const UploadsAndConnectionsPage = () => {
//   const [uploads, setUploads] = useState<Upload[]>([]);
//   const [connections, setConnections] = useState<Connection[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const userId = localStorage.getItem("user_id");

//   const fetchUploads = async () => {
//     if (!userId) {
//       setError("User ID is not available");
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:5000/api/getallFiles12", {
//         params: { user_id: userId },
//       });

//       setUploads(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching uploads:", err);
//       setError("Error fetching uploads");
//     }
//   };

//   const fetchConnections = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/getConnectionsWithDetails");

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const result = await response.json();
//       setConnections(result.data || []);
//     } catch (error) {
//       console.error("Error fetching connections:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openPdf = (file: Upload) => {
//     const pdfUrl = `http://localhost:5000/api/uploads/${file.file_path}`;
//     window.open(pdfUrl, "_blank");
//   };

//   const handleDelete = async (id: number) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete the file.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/api/deleteFile/${id}/${userId}`);
//         setUploads((prev) => prev.filter((upload) => upload.id !== id));
//         Swal.fire("Deleted!", "Your file has been deleted.", "success");
//       } catch (err) {
//         console.error("Delete error:", err);
//         Swal.fire("Error", "Failed to delete the file.", "error");
//       }
//     }
//   };

//   const handleAccept = async (uploadId: number, receiverId: number) => {
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
//         status: 'Accepted',
//       });
  
//       alert('Connection request sent successfully!');
//       console.log('Response:', res.data);
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request. Try again.');
//     }
//   };
  

//   const handleReject = async (uploadId: number, receiverId: number) => {
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
//         status: 'Rejected',
//       });
  
//       alert('Connection request sent successfully!');
//       console.log('Response:', res.data);
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request. Try again.');
//     }
//   };
  

//   useEffect(() => {
//     fetchUploads();
//     fetchConnections();
//   }, [userId]);

//   if (loading) {
//     return <p>Loading connections...</p>;
//   }

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">📂 My Uploaded Files</h2>

//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {uploads.map((file) => (
//           <motion.div
//             key={file.id}
//             className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
//             whileHover={{ scale: 1.02 }}
//           >
//             <h3 className="text-lg font-semibold text-blue-700">{file.name}</h3>
//             <p className="text-sm text-gray-600">Sector: {file.sector}</p>
//             <p className="text-sm text-gray-600">Category: {file.category}</p>
//             <div className="mt-4 space-y-2">
//               <button
//                 onClick={() => openPdf(file)}
//                 className="w-full py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 View PDF
//               </button>
//               {/* <button
//                 onClick={() => handleAccept(file.id, parseInt(userId!))}
//                 className="w-full py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => handleReject(file.id, parseInt(userId!))}
//                 className="w-full py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               >
//                 Reject
//               </button> */}
//               <button
//                 onClick={() => handleDelete(file.id)}
//                 className="w-full py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <h2 className="text-2xl font-bold mt-8 mb-6">Connection Requests</h2>
//       {connections.length === 0 ? (
//         <p>No connection requests found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {connections.map((conn) => (
//             <li key={conn.id} className="border rounded-lg p-4 shadow-sm bg-white">
//               <p>
//                 <strong>{conn.sender_name}</strong> sent a request to{" "}
//                 <strong>{conn.upload_owner_name}</strong>'s file.
//               </p>
//               <p className="mt-1">
//                 <span className="font-medium">Funding Needs:</span>{" "}
//                 {conn.fundingneeds}
//               </p>
//               <p className="mt-1 text-sm text-gray-500">
//                 Status: {conn.status} | Requested on:{" "}
//                 {new Date(conn.created_at).toLocaleString()}
//               </p>
//               <div className="mt-4 flex space-x-4">
//                 <button
//                   onClick={() => handleAccept(parseInt(conn.upload_id), parseInt(conn.upload_owner_id))}
//                   className="py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleReject(parseInt(conn.upload_id), parseInt(conn.upload_owner_id))}
//                   className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UploadsAndConnectionsPage;


// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";

// interface Upload {
//   id: number;
//   name: string;
//   category: string;
//   sector: string;
//   timestamp: string;
//   file_path: string;
//   user_id: number;
// }

// interface Connection {
//   id: string;
//   sender_id: string;
//   sender_name: string;
//   upload_id: string;
//   fundingneeds: string;
//   upload_owner_id: string;
//   upload_owner_name: string;
//   status: string;
//   created_at: string;
// }

// const UploadsAndConnectionsPage = () => {
//   const [uploads, setUploads] = useState<Upload[]>([]);
//   const [connections, setConnections] = useState<Connection[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const userId = localStorage.getItem("user_id");

//   const fetchUploads = async () => {
//     if (!userId) {
//       setError("User ID is not available");
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:5000/api/getallFiles12", {
//         params: { user_id: userId },
//       });

//       setUploads(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching uploads:", err);
//       setError("Error fetching uploads");
//     }
//   };

//   const fetchConnections = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/getConnectionsWithDetails");

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const result = await response.json();
//       setConnections(result.data || []);
//     } catch (error) {
//       console.error("Error fetching connections:", error);
//     } finally {
//       setLoading(false);
//       setIsRefreshing(false);
//     }
//   };

//   const openPdf = (file: Upload) => {
//     const pdfUrl = `http://localhost:5000/api/uploads/${file.file_path}`;
//     window.open(pdfUrl, "_blank");
//   };

//   const handleDelete = async (id: number) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete the file.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/api/deleteFile/${id}/${userId}`);
//         setUploads((prev) => prev.filter((upload) => upload.id !== id));
//         Swal.fire("Deleted!", "Your file has been deleted.", "success");
//       } catch (err) {
//         console.error("Delete error:", err);
//         Swal.fire("Error", "Failed to delete the file.", "error");
//       }
//     }
//   };

//   const handleAccept = async (uploadId: number, receiverId: number) => {
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
//         status: 'Accepted',
//       });
  
//       alert('Connection request sent successfully!');
//       console.log('Response:', res.data);
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request. Try again.');
//     }
//   };
  

//   const handleReject = async (uploadId: number, receiverId: number) => {
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
//         status: 'Rejected',
//       });
  
//       alert('Connection request sent successfully!');
//       console.log('Response:', res.data);
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request. Try again.');
//     }
//   };

//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     fetchUploads();
//     fetchConnections();
//   };

//   useEffect(() => {
//     fetchUploads();
//     fetchConnections();
//   }, [userId]);

//   if (loading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-lg font-medium text-gray-700">Loading your data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen bg-gray-50 relative">
//       {/* Refresh overlay */}
//       {isRefreshing && (
//         <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-40">
//           <div className="text-center">
//             <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
//             <p className="text-md font-medium text-gray-700">Refreshing data...</p>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">📂 My Uploaded Files</h2>
//           <button
//             onClick={handleRefresh}
//             className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
//             </svg>
//             Refresh
//           </button>
//         </div>

//         {error && (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//             <p>{error}</p>
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {uploads.map((file) => (
//             <motion.div
//               key={file.id}
//               className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
//               whileHover={{ y: -5 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="text-xl font-bold text-gray-800 truncate">{file.name}</h3>
//                   <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                     {file.category}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-2">
//                   <span className="font-medium">Sector:</span> {file.sector}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-4">
//                   Uploaded: {new Date(file.timestamp).toLocaleDateString()}
//                 </p>
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => openPdf(file)}
//                     className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
//                   >
//                     View PDF
//                   </button>
//                   <button
//                     onClick={() => handleDelete(file.id)}
//                     className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-sm"
//                   >
//                     Delete File
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">🔗 Connection Requests</h2>
          
//           {connections.length === 0 ? (
//             <div className="text-center py-8">
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
//                   d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//                 />
//               </svg>
//               <h3 className="mt-4 text-lg font-medium text-gray-900">No connection requests</h3>
//               <p className="mt-1 text-sm text-gray-500">You don't have any pending connection requests.</p>
//             </div>
//           ) : (
//             <ul className="space-y-4">
//               {connections.map((conn) => (
//                 <motion.li
//                   key={conn.id}
//                   className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-gray-50"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                     <div>
//                       <p className="text-gray-800">
//                         <span className="font-semibold text-blue-600">{conn.sender_name}</span> sent a request for{" "}
//                         <span className="font-semibold text-blue-600">{conn.upload_owner_name}</span>'s file
//                       </p>
//                       <p className="mt-2 text-sm text-gray-600">
//                         <span className="font-medium">Funding Needs:</span> {conn.fundingneeds}
//                       </p>
//                       <div className="mt-2 flex items-center gap-2">
//                         <span className={`px-2 py-1 text-xs rounded-full ${
//                           conn.status === 'Accepted' ? 'bg-green-100 text-green-800' :
//                           conn.status === 'Rejected' ? 'bg-red-100 text-red-800' :
//                           'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {conn.status}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           {new Date(conn.created_at).toLocaleString()}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex gap-2 sm:flex-col sm:gap-1">
//                       <button
//                         onClick={() => handleAccept(parseInt(conn.upload_id), parseInt(conn.upload_owner_id))}
//                         className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
//                         disabled={conn.status !== 'pending'}
//                       >
//                         Accept
//                       </button>
//                       <button
//                         onClick={() => handleReject(parseInt(conn.upload_id), parseInt(conn.upload_owner_id))}
//                         className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
//                         disabled={conn.status !== 'pending'}
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </div>
//                 </motion.li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadsAndConnectionsPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";

// interface Upload {
//   id: number;
//   name: string;
//   category: string;
//   sector: string;
//   timestamp: string;
//   file_path: string;
//   user_id: number;
// }

// interface Connection {
//   id: string;
//   sender_id: string;
//   sender_name: string;
//   upload_id: string;
//   fundingneeds: string;
//   upload_owner_id: string;
//   upload_owner_name: string;
//   status: string;
//   created_at: string;
// }

// const UploadsAndConnectionsPage = () => {
//   const [uploads, setUploads] = useState<Upload[]>([]);
//   const [connections, setConnections] = useState<Connection[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const userId = localStorage.getItem("user_id");

//   const fetchUploads = async () => {
//     if (!userId) {
//       setError("User ID is not available");
//       return;
//     }

//     try {
//       const res = await axios.get("http://localhost:5000/api/getallFiles12", {
//         params: { user_id: userId },
//       });

//       setUploads(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching uploads:", err);
//       setError("Error fetching uploads");
//     }
//   };

//   const fetchConnections = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/getConnectionsWithDetails");

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const result = await response.json();
//       setConnections(result.data || []);
//     } catch (error) {
//       console.error("Error fetching connections:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openPdf = (file: Upload) => {
//     const pdfUrl = `http://localhost:5000/api/uploads/${file.file_path}`;
//     window.open(pdfUrl, "_blank");
//   };

//   const handleDelete = async (id: number) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete the file.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/api/deleteFile/${id}/${userId}`);
//         setUploads((prev) => prev.filter((upload) => upload.id !== id));
//         Swal.fire("Deleted!", "Your file has been deleted.", "success");
//       } catch (err) {
//         console.error("Delete error:", err);
//         Swal.fire("Error", "Failed to delete the file.", "error");
//       }
//     }
//   };

//   const handleAccept = async (uploadId: number, receiverId: number) => {
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
//         status: 'Accepted',
//       });
  
//       alert('Connection request sent successfully!');
//       console.log('Response:', res.data);
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request. Try again.');
//     }
//   };
  

//   const handleReject = async (uploadId: number, receiverId: number) => {
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
//         status: 'Rejected',
//       });
  
//       alert('Connection request sent successfully!');
//       console.log('Response:', res.data);
//     } catch (err) {
//       console.error('Error sending request:', err);
//       alert('Failed to send request. Try again.');
//     }
//   };
  

//   useEffect(() => {
//     fetchUploads();
//     fetchConnections();
//   }, [userId]);

//   if (loading) {
//     return <p>Loading connections...</p>;
//   }

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">📂 My Uploaded Files</h2>

//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {uploads.map((file) => (
//           <motion.div
//             key={file.id}
//             className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
//             whileHover={{ scale: 1.02 }}
//           >
//             <h3 className="text-lg font-semibold text-blue-700">{file.name}</h3>
//             <p className="text-sm text-gray-600">Sector: {file.sector}</p>
//             <p className="text-sm text-gray-600">Category: {file.category}</p>
//             <div className="mt-4 space-y-2">
//               <button
//                 onClick={() => openPdf(file)}
//                 className="w-full py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 View PDF
//               </button>
//               {/* <button
//                 onClick={() => handleAccept(file.id, parseInt(userId!))}
//                 className="w-full py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => handleReject(file.id, parseInt(userId!))}
//                 className="w-full py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               >
//                 Reject
//               </button> */}
//               <button
//                 onClick={() => handleDelete(file.id)}
//                 className="w-full py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <h2 className="text-2xl font-bold mt-8 mb-6">Connection Requests</h2>
//       {connections.length === 0 ? (
//         <p>No connection requests found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {connections.map((conn) => (
//             <li key={conn.id} className="border rounded-lg p-4 shadow-sm bg-white">
//               <p>
//                 <strong>{conn.sender_name}</strong> sent a request to{" "}
//                 <strong>{conn.upload_owner_name}</strong>'s file.
//               </p>
//               <p className="mt-1">
//                 <span className="font-medium">Funding Needs:</span>{" "}
//                 {conn.fundingneeds}
//               </p>
//               <p className="mt-1 text-sm text-gray-500">
//                 Status: {conn.status} | Requested on:{" "}
//                 {new Date(conn.created_at).toLocaleString()}
//               </p>
//               <div className="mt-4 flex space-x-4">
//                 <button
//                   onClick={() => handleAccept(parseInt(conn.upload_id), parseInt(conn.upload_owner_id))}
//                   className="py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleReject(parseInt(conn.upload_id), parseInt(conn.upload_owner_id))}
//                   className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UploadsAndConnectionsPage;



"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { 
  FiFile, FiDownload, FiTrash2, FiUser, 
  FiClock, FiCheck, FiX, FiSend, 
  FiAlertCircle, FiExternalLink, FiDatabase
} from "react-icons/fi";

interface Upload {
  id: number;
  name: string;
  category: string;
  sector: string;
  timestamp: string;
  file_path: string;
  user_id: number;
}

interface Connection {
  id: string;
  sender_id: string;
  sender_name: string;
  upload_id: string;
  fundingneeds: string;
  upload_owner_id: string;
  upload_owner_name: string;
  status: string;
  created_at: string;
}

const UploadsAndConnectionsPage = () => {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  const fetchUploads = async () => {
    if (!userId) {
      setError("User ID is not available");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/getallFiles12", {
        params: { user_id: userId },
      });

      setUploads(res.data.data || []);
    } catch (err) {
      console.error("Error fetching uploads:", err);
      setError("Error fetching uploads");
    }
  };

  const fetchConnections = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getConnectionsWithDetails");

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      setConnections(result.data || []);
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  };

  const openPdf = (file: Upload) => {
    const pdfUrl = `http://localhost:5000/api/uploads/${file.file_path}`;
    window.open(pdfUrl, "_blank");
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the file.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/deleteFile/${id}/${userId}`);
        setUploads((prev) => prev.filter((upload) => upload.id !== id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete the file.", "error");
      }
    }
  };

  const handleAccept = async (uploadId: number, receiverId: number) => {
    const senderId = localStorage.getItem('user_id');
  
    if (!senderId) {
      alert('Please log in first.');
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:5000/api/update-status', {
        uploadId,
        userId: parseInt(senderId),
        targetUserId: receiverId,
        status: 'Accepted',
      });
  
      fetchConnections();
      Swal.fire("Success!", "Connection request accepted.", "success");
    } catch (err) {
      console.error('Error accepting request:', err);
      Swal.fire("Error", "Failed to accept request.", "error");
    }
  };
  
  const handleReject = async (uploadId: number, receiverId: number) => {
    const senderId = localStorage.getItem('user_id');
  
    if (!senderId) {
      alert('Please log in first.');
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:5000/api/update-status', {
        uploadId,
        userId: parseInt(senderId),
        targetUserId: receiverId,
        status: 'Rejected',
      });
  
      fetchConnections();
      Swal.fire("Success!", "Connection request rejected.", "success");
    } catch (err) {
      console.error('Error rejecting request:', err);
      Swal.fire("Error", "Failed to reject request.", "error");
    }
  };

  useEffect(() => {
    fetchUploads();
    fetchConnections();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading your documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 py-16 px-6 text-white shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Document Management Portal</h1>
          <p className="text-blue-100 opacity-90 max-w-2xl">
            Manage your professional documents and investor connections in one place
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-12">
        {/* Uploads Section */}
        <div className="bg-white rounded-xl shadow-xl mb-12 overflow-hidden border border-gray-100">
          <div className="border-b border-gray-200 px-6 py-5 flex items-center justify-between bg-gray-50">
            <h2 className="text-xl font-semibold flex items-center text-gray-800">
              <FiDatabase className="mr-3 text-blue-600" />
              My Document Library
            </h2>
            <div className="flex items-center">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {uploads.length} {uploads.length === 1 ? 'Document' : 'Documents'}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 my-4 rounded">
              <div className="flex items-center">
                <FiAlertCircle className="text-red-500 mr-3" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="p-6">
            {uploads.length === 0 ? (
              <div className="text-center py-12">
                <FiFile className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No documents found</h3>
                <p className="text-gray-500">Upload your first document to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploads.map((file) => (
                  <motion.div
                    key={file.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    whileHover={{ y: -3 }}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">{file.name}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                              {file.category}
                            </span>
                            <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded">
                              {file.sector}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => openPdf(file)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View document"
                        >
                          <FiExternalLink />
                        </button>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <FiClock className="mr-2" />
                        <span>Uploaded {new Date(file.timestamp).toLocaleDateString()}</span>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => openPdf(file)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                        >
                          <FiDownload className="mr-2" />
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(file.id)}
                          className="w-10 h-10 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                          title="Delete document"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Connections Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="border-b border-gray-200 px-6 py-5 flex items-center justify-between bg-gray-50">
            <h2 className="text-xl font-semibold flex items-center text-gray-800">
              <FiUser className="mr-3 text-blue-600" />
              Connection Requests
            </h2>
            <div className="flex items-center">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {connections.length} {connections.length === 1 ? 'Request' : 'Requests'}
              </span>
            </div>
          </div>

          <div className="p-6">
            {connections.length === 0 ? (
              <div className="text-center py-12">
                <FiSend className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No connection requests</h3>
                <p className="text-gray-500">When investors request access, it will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {connections.map((conn) => (
                  <motion.div
                    key={conn.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <div className="p-5">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <FiUser className="text-xl" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 mb-1">{conn.sender_name}</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Requested access to <span className="font-medium">{conn.upload_owner_name}</span>'s document
                          </p>
                          <div className="bg-gray-50 p-3 rounded-lg mb-3">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Funding Needs:</span> {conn.fundingneeds}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <FiClock className="mr-2" />
                              <span>{new Date(conn.created_at).toLocaleString()}</span>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              conn.status === 'Accepted' 
                                ? 'bg-green-100 text-green-800' 
                                : conn.status === 'Rejected' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {conn.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {conn.status === 'Requested' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleAccept(parseInt(conn.upload_id), parseInt(conn.upload_owner_id))}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                          >
                            <FiCheck className="mr-2" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(parseInt(conn.upload_id), parseInt(conn.upload_owner_id))}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                          >
                            <FiX className="mr-2" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadsAndConnectionsPage;
