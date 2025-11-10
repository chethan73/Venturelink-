'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFilePdf, FaImage, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // File-type icons
import { motion } from 'framer-motion'; // Animation library

interface FileData {
  id: number;
  name: string;
  description: string;
  category: string;
  file_path: string; // Path to the file (image or PDF)
  status: string; // New field to store status (approved/rejected/pending)
}

const IdeaDisplay: React.FC = () => {
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<FileData | null>(null);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallFiles');
        console.log('Fetched File Data:', response.data.data);
        setFileData(response.data.data);
      } catch (err) {
        console.error('Error fetching file data:', err);
        setError('Error fetching file data');
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, []);

  const openModal = (file: FileData) => {
    setCurrentFile(file);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFile(null);
  };

  const handleApproval = async (fileId: number) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/files/status/${fileId}/approved`);
      console.log(response.data.message);

      // Update the status locally
      setFileData(prev => prev.map(file =>
        file.id === fileId ? { ...file, status: 'Approved' } : file
      ));
    } catch (error) {
      console.error('Error approving file:', error);
    }
  };

  const handleRejection = async (fileId: number) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/files/status/${fileId}/rejected`);
      console.log(response.data.message);

      // Update the status locally
      setFileData(prev => prev.map(file =>
        file.id === fileId ? { ...file, status: 'Rejected' } : file
      ));
    } catch (error) {
      console.error('Error rejecting file:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold text-blue-600 animate-pulse">Loading files...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {fileData.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No files to display</div>
        ) : (
          fileData.map((file) => (
            <motion.div
              key={file.id}
              className="bg-white shadow-2xl rounded-2xl overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300">{file.name}</h3>
                <p className="text-gray-700">{file.description}</p>
                <p className="text-gray-500 text-sm">Category: <span className="font-semibold">{file.category}</span></p>
                
                <div className="text-center">
                  {/* Status Indicator with Icons */}
                  {/* <div className={`mt-2 text-lg font-semibold ${file.status === 'Approved' ? 'text-green-500' : file.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                    {file.status === 'Approved' ? (
                      <FaCheckCircle className="inline mr-2" />
                    ) : file.status === 'Rejected' ? (
                      <FaTimesCircle className="inline mr-2" />
                    ) : (
                      <FaTimesCircle className="inline mr-2" />
                    )}
                    {file.status}
                  </div> */}

                  {/* Buttons for Approval and Rejection */}
                  {/* <div className="flex justify-center gap-4 mt-4">
                    <motion.button
                      onClick={() => handleApproval(file.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                      whileHover={{ scale: 1.1 }}
                      disabled={file.status === 'Approved'}
                    >
                      <FaCheckCircle className="inline mr-2" />
                      Approve
                    </motion.button>

                    <motion.button
                      onClick={() => handleRejection(file.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                      whileHover={{ scale: 1.1 }}
                      disabled={file.status === 'Rejected'}
                    >
                      <FaTimesCircle className="inline mr-2" />
                      Reject
                    </motion.button>
                  </div> */}
                </div>

                <button
                  onClick={() => openModal(file)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 mt-4"
                >
                  View {file.file_path.endsWith('.pdf') ? 'PDF' : 'Image'} <FaFilePdf className="inline ml-2" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Modal for file display */}
      {isModalOpen && currentFile && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-semibold text-gray-800">{currentFile.name}</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 text-3xl hover:text-gray-700 focus:outline-none"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4">
              {currentFile.file_path && currentFile.file_path.endsWith('.pdf') ? (
                <embed
                  src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
                  width="100%"
                  height="500px"
                  type="application/pdf"
                  className="rounded-lg"
                />
              ) : currentFile.file_path ? (
                <img
                  src={`http://localhost:5000/api/uploads/${currentFile.file_path}`}
                  alt={currentFile.name}
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-500">No file available</div>
              )}
            </div>
            <button
              onClick={closeModal}
              className="mt-6 py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaDisplay;
