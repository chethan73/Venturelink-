// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion'; // Ensure this import is available

// interface Upload {
//   id: number;
//   name: string;
//   category: string;
//   sector: string;
//   timestamp: string;
//   file_path: string; // Adding file_path to the interface
// }

// const UploadsPage = () => {
//   const [uploads, setUploads] = useState<Upload[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
//   const [currentFile, setCurrentFile] = useState<Upload | null>(null); // Current file for modal
//   const userId = localStorage.getItem('user_id');

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentFile(null); // Reset the current file when closing the modal
//   };

//   const openModal = (file: Upload) => {
//     setCurrentFile(file);
//     setIsModalOpen(true);
//   };

//   const openPdfModal = (file: Upload) => {
//     setCurrentFile(file); // Set the current file when the "View PDF" button is clicked
//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     const fetchUploads = async () => {
//       if (!userId) {
//         setError('User ID is not available');
//         return;
//       }

//       try {
//         console.log('Fetching uploads for user_id:', userId); // Log user ID
//         const res = await axios.get('http://localhost:5000/api/getallFiles12', {
//           params: { user_id: userId }, // Sending user_id as query parameter
//         });

//         // Log the fetched uploads
//         console.log('Uploads fetched:', res.data.data);

//         if (res.data.data && res.data.data.length > 0) {
//           setUploads(res.data.data);
//         } else {
//           setError('No uploads found for this user');
//         }
//       } catch (err) {
//         console.error('Error fetching uploads:', err);
//         setError('Error fetching uploads');
//       }
//     };

//     fetchUploads();
//   }, [userId]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Uploaded Files</h2>

//       {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}

//       {uploads.length === 0 ? (
//         <p className="text-gray-500">No uploads found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {uploads.map((upload) => (
//             <li
//               key={upload.id}
//               className="border p-4 rounded shadow cursor-pointer"
//             >
//               <p>
//                 <strong>File Name:</strong> {upload.name}
//               </p>
//               <p>
//                 <strong>Category:</strong> {upload.category}
//               </p>
//               <p>
//                 <strong>Sector:</strong> {upload.sector}
//               </p>
//               <p>
//                 <strong>Uploaded At:</strong> {new Date(upload.timestamp).toLocaleString()}
//               </p>
//               <button
//                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 onClick={() => openPdfModal(upload)} // Trigger modal on View PDF button click
//               >
//                 View PDF
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

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

// export default UploadsPage;


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

// const UploadsPage = () => {
//   const [uploads, setUploads] = useState<Upload[]>([]);
//   const [error, setError] = useState<string | null>(null);
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

//   // const handleAccept = async (uploadId: number) => {
//   //   try {
//   //     const res = await axios.put('http://localhost:5000/api/accept-upload', {
//   //       uploadId,
//   //       userId,
//   //     });

//   //     if (res.data.success) {
//   //       Swal.fire('Accepted!', 'You have accepted this upload.', 'success');
//   //       fetchUploads();
//   //     } else {
//   //       Swal.fire('Error', 'Could not accept the upload.', 'error');
//   //     }
//   //   } catch (err) {
//   //     console.error('Accept error:', err);
//   //     Swal.fire('Error', 'Failed to accept the file.', 'error');
//   //   }
//   // };

//   const handleAccept = async (uploadId: number, userId: number) => {
//     try {
//       // Sending request to update the status of the upload
//       const res = await axios.post('http://localhost:5000/api/update-status', {
//         uploadId,
//         status: 'accept', // or 'requested'
//       });
  
//       // Displaying the success message in the alert box
//       alert(`Connection request sent successfully for upload ID: ${uploadId}`);
  
//       // Logging the selected user ID to the console
//       console.log(`User ID of the selected user: ${uploadId}`);
  
//       console.log('Status updated:', res.data);
//     } catch (err) {
//       // In case of an error, display a message and log the error
//       console.error('Status update failed:', err);
//       alert('Failed to update the status. Please try again.');
//     }
//   };

//   // const handleReject = async (uploadId: number) => {
//   //   try {
//   //     const res = await axios.put('http://localhost:5000/api/reject-upload', {
//   //       uploadId,
//   //       userId,
//   //     });

//   //     if (res.data.success) {
//   //       Swal.fire('Rejected!', 'You have rejected this upload.', 'info');
//   //       fetchUploads();
//   //     } else {
//   //       Swal.fire('Error', 'Could not reject the upload.', 'error');
//   //     }
//   //   } catch (err) {
//   //     console.error('Reject error:', err);
//   //     Swal.fire('Error', 'Failed to reject the file.', 'error');
//   //   }
//   // };

//   const handleReject = async (uploadId: number, userId: number) => {
//     try {
//       // Sending request to update the status of the upload
//       const res = await axios.post('http://localhost:5000/api/update-status', {
//         uploadId,
//         status: 'Rejected', // or 'requested'
//       });
  
//       // Displaying the success message in the alert box
//       alert(`Connection request sent successfully for upload ID: ${uploadId}`);
  
//       // Logging the selected user ID to the console
//       console.log(`User ID of the selected user: ${uploadId}`);
  
//       console.log('Status updated:', res.data);
//     } catch (err) {
//       // In case of an error, display a message and log the error
//       console.error('Status update failed:', err);
//       alert('Failed to update the status. Please try again.');
//     }
//   };

//   useEffect(() => {
//     fetchUploads();
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
//                 onClick={() => handleAccept(file.id)}
//                 className="w-full py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Accept
//               </button>
//               <button
//                 onClick={() => handleReject(file.id)}
//                 className="w-full py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               >
//                 Reject
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
//     </div>
//   );
// };

// export default UploadsPage;


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

  // Accept connection request
const handleAccept = async (uploadId: number, receiverId: number) => {
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
      status: 'Accepted',
    });

    Swal.fire("Success!", "Connection request accepted.", "success");
    fetchConnections(); // ✅ refresh data after update
  } catch (err) {
    console.error('Error accepting request:', err);
    Swal.fire("Error", "Failed to accept request.", "error");
  }
};

// Reject connection request
const handleReject = async (uploadId: number, receiverId: number) => {
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
      status: 'Rejected',
    });

    Swal.fire("Success!", "Connection request rejected.", "success");
    fetchConnections(); // ✅ refresh data after update
  } catch (err) {
    console.error('Error rejecting request:', err);
    Swal.fire("Error", "Failed to reject request.", "error");
  }
};

// Fetch data on load
useEffect(() => {
  fetchUploads();      // fetch your uploaded documents
  fetchConnections();  // fetch all connection requests
}, []);


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