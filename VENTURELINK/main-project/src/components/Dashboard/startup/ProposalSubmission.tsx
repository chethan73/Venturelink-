


// "use client";

// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaUpload, FaFileAlt, FaClipboardList, FaTag } from 'react-icons/fa';
// import MatchResults from './Investormatches'; // ✅ Adjust this import path if needed

// const ProposalSubmission = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [fundingNeeds, setFundingNeeds] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [submittedData, setSubmittedData] = useState<any | null>(null);

//   const categories = ['IT', 'Healthcare', 'Finance', 'Marketing'];
//   const fundingOptions = [
//     '₹1L - ₹5L',
//     '₹5L - ₹10L',
//     '₹10L - ₹25L',
//     '₹25L - ₹50L',
//     '₹50L - ₹1Cr',
//     '₹1Cr+',
//   ];
//   const sector = 'Startup';

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!file) {
//       alert("Please select a file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("sector", sector);
//     formData.append("fundingneeds", fundingNeeds);

//     try {
//       const response = await axios.post('http://localhost:5000/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Upload successful:', response.data);

//       const uploadedId = response.data.id;

//       setSubmittedData({
//         id: uploadedId,
//         name,
//         description,
//         category,
//         sector,
//         fundingNeeds,
//         file: file.name,
//       });

//       setShowPopup(true);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert("Error uploading file. Please check your input and try again.");
//     }
//   };

//   const handleClearForm = () => {
//     setFile(null);
//     setName('');
//     setDescription('');
//     setCategory('');
//     setFundingNeeds('');
//     setSubmittedData(null);
//     setShowPopup(false);
//   };

//   return (
//     <motion.div
//       className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-indigo-200 via-blue-100 to-indigo-300 shadow-lg rounded-xl"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.7 }}
//     >
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Investor File Upload</h2>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         <div>
//           <label className="block text-gray-700 text-lg mb-2 flex items-center">
//             <FaFileAlt className="mr-2 text-indigo-600" />
//             Investor Name
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter investor name"
//             className="w-full py-3 px-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xl"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 text-lg mb-2 flex items-center">
//             <FaClipboardList className="mr-2 text-indigo-600" />
//             Description
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Provide a brief description"
//             className="w-full py-3 px-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg h-40"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 text-lg mb-2 flex items-center">
//             <FaTag className="mr-2 text-indigo-600" />
//             Sector
//           </label>
//           <input
//             type="text"
//             value={sector}
//             className="w-full py-3 px-4 bg-gray-100 border-2 border-gray-300 rounded-lg text-xl"
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 text-lg mb-2 flex items-center">
//             <FaTag className="mr-2 text-indigo-600" />
//             Category
//           </label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full py-3 px-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xl"
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-gray-700 text-lg mb-2 flex items-center">
//             <FaTag className="mr-2 text-indigo-600" />
//             Funding Needs
//           </label>
//           <select
//             value={fundingNeeds}
//             onChange={(e) => setFundingNeeds(e.target.value)}
//             className="w-full py-3 px-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xl"
//             required
//           >
//             <option value="">Select Funding Range</option>
//             {fundingOptions.map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-gray-700 text-lg mb-2 flex items-center">
//             <FaUpload className="mr-2 text-indigo-600" />
//             Upload File
//           </label>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="w-full py-3 px-4 bg-white border-2 border-gray-300 rounded-lg"
//             required
//           />
//         </div>

//         <div className="flex space-x-4 justify-between">
//           <motion.button
//             type="submit"
//             className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700"
//             whileHover={{ scale: 1.05 }}
//           >
//             Submit File
//           </motion.button>
//           <motion.button
//             type="button"
//             onClick={handleClearForm}
//             className="w-full py-3 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600"
//             whileHover={{ scale: 1.05 }}
//           >
//             Reset
//           </motion.button>
//         </div>
//       </form>

//       {showPopup && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="text-xl font-bold text-center">File uploaded successfully!</p>
//           </div>
//         </div>
//       )}

//       {/* ✅ Show match results after submission */}
//       {submittedData?.id && (
//         <div className="mt-10">
//           <MatchResults id={submittedData.id} />
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default ProposalSubmission;


'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, FileText, ClipboardList, Tag, X, CheckCircle,
  ArrowRight, ChevronDown, Loader2, Landmark, Rocket, BadgeCheck, Building2
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProposalSubmission = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sector, setSector] = useState('Startup');
  const [fundingNeeds, setFundingNeeds] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const categories = ['Technology', 'Healthcare', 'Finance', 'Consumer', 'Industrial'];
  const fundingOptions = [
    '₹1L - ₹5L',
    '₹5L - ₹10L',
    '₹10L - ₹25L',
    '₹25L - ₹50L', 
    '₹50L - ₹1Cr',
    '₹1Cr+'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!file) {
      alert("Please upload your business plan");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("sector", sector);
    formData.append("fundingneeds", fundingNeeds);
    
    const userId = localStorage.getItem('user_id');
    if (userId) formData.append("userId", userId);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSubmittedData({
        id: response.data.id,
        name,
        description,
        category,
        sector,
        fundingNeeds,
        file: file.name,
        user_id: userId
      });

      setShowPopup(true);
    } catch (error) {
      console.error('Upload error:', error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    setFile(null);
    setName('');
    setDescription('');
    setCategory('');
    setFundingNeeds('');
    setSubmittedData(null);
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200 shadow-sm mb-4">
            <Rocket className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-slate-700">Startup Portal</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Submit Your Proposal</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Connect with investors by sharing your startup details
          </p>
        </motion.header>

        {/* Progress Steps */}
        <div className="mb-12 px-4 sm:px-12">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 -translate-y-1/2"></div>
            <div className="relative flex justify-between">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(Math.min(step, 3))}
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    activeStep >= step 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-white text-slate-400 border border-slate-300'
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
        >
          {/* Form Header */}
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-3">
              <FileText className="text-indigo-600" />
              Startup Information
            </h2>
            <p className="text-slate-500 mt-1">Step {activeStep} of 3 - Basic details</p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Startup Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Company Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your startup name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Sector (read-only) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Sector</label>
                <div className="relative">
                  <input
                    type="text"
                    value={sector}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Industry Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Industry</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                >
                  <option value="">Select industry</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Business Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product, market opportunity, and competitive advantage"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-40 transition-all"
                required
              />
            </div>

            {/* Funding Needs */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                <Landmark className="w-4 h-4" />
                Funding Requirements
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {fundingOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFundingNeeds(option)}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      fundingNeeds === option
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Business Plan</label>
              <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-indigo-300 transition-colors bg-slate-50/50">
                <div className="flex flex-col items-center justify-center text-center">
                  <UploadCloud className="w-10 h-10 mb-3 text-indigo-500" />
                  <p className="text-sm text-slate-500">
                    <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PDF, DOCX (Max. 10MB)</p>
                </div>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  required
                />
              </label>
              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>{file.name}</span>
                  <button 
                    type="button"
                    onClick={() => setFile(null)}
                    className="ml-2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6">
              <button
                type="button"
                onClick={handleClearForm}
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-md shadow-indigo-500/20 font-medium disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Proposal
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">Proposal Submitted!</h3>
                      <p className="text-slate-500 mt-1">We've received your application</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Submission Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Reference ID</span>
                        <span className="font-medium">{submittedData?.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Company</span>
                        <span className="font-medium">{submittedData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Industry</span>
                        <span className="font-medium">{submittedData?.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <BadgeCheck className="flex-shrink-0 w-5 h-5 text-indigo-600" />
                    <p className="text-sm text-indigo-700">
                      Our team will review your proposal and contact you within 3 business days.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                  
                    // onClick={() => setShowPopup(false)}
                     onClick={() => router.push(`/startup/UploadsPage`)}

                    className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
                  >
                    View Dashboard
                  </button>
                  <button className="w-full py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium">
                    Download Copy
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProposalSubmission;
// Make sure "use client" is at the very top
// 'use client'; 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaUpload, FaFileAlt, FaClipboardList, FaTag, FaTimes, FaCheckCircle } from 'react-icons/fa';

// const ProposalSubmission = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [fundingNeeds, setFundingNeeds] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [submittedData, setSubmittedData] = useState<any | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null); // State to store the user ID
//   const [startupName, setStartupName] = useState(''); // State to store the startup name

//   const categories = ['IT', 'Healthcare', 'Finance', 'Marketing'];
//   const fundingOptions = [
//     '₹1L - ₹5L',
//     '₹5L - ₹10L',
//     '₹10L - ₹25L',
//     '₹25L - ₹50L',
//     '₹50L - ₹1Cr',
//     '₹1Cr+',
//   ];
//   const sector = 'Startup';

//   // Fetch the user ID and name when the component mounts
//   useEffect(() => {
//     const id = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage or fetched from context/session
//     if (id) {
//       setUserId(id);
//       // Fetch user data based on the user ID
//       axios
//         .get(`http://localhost:5000/api/users/${id}`) // Update the URL to your backend API that returns the user data
//         .then((response) => {
//           // Assuming the response contains a 'startupName' field for the logged-in user
//           setStartupName(response.data.startupName);
//         })
//         .catch((error) => {
//           console.error('Error fetching user data:', error);
//         });
//     } else {
//       console.error('User ID not found');
//     }
//   }, []);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsSubmitting(true);

//     if (!file) {
//       alert("Please select a file to upload.");
//       setIsSubmitting(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("sector", sector);
//     formData.append("fundingneeds", fundingNeeds);
//     formData.append("userId", userId || ""); // Include the user ID in the form data

//     try {
//       const response = await axios.post('http://localhost:5000/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const uploadedId = response.data.id;

//       setSubmittedData({
//         id: uploadedId,
//         name,
//         description,
//         category,
//         sector,
//         fundingNeeds,
//         file: file.name,
//       });

//       setShowPopup(true);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert("Error uploading file. Please check your input and try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClearForm = () => {
//     setFile(null);
//     setName('');
//     setDescription('');
//     setCategory('');
//     setFundingNeeds('');
//     setSubmittedData(null);
//     setShowPopup(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-6 px-8 text-white">
//           <h1 className="text-3xl font-bold">Startup Proposal Submission</h1>
//           <p className="mt-2 opacity-90">Complete the form to find the best investment matches</p>
//         </div>

//         {/* Main Form */}
//         <form onSubmit={handleSubmit} className="p-8 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Startup Name (autofilled) */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <FaFileAlt className="mr-2 text-indigo-500" />
//                 Startup Name
//               </label>
//               <input
//                 type="text"
//                 value={startupName} // Auto-fill startup name from the fetched user data
//                 readOnly
//                 className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-lg cursor-not-allowed"
//               />
//             </div>

//             {/* Sector (read-only) */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <FaTag className="mr-2 text-indigo-500" />
//                 Sector
//               </label>
//               <input
//                 type="text"
//                 value={sector}
//                 className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-lg cursor-not-allowed"
//                 readOnly
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 flex items-center">
//               <FaClipboardList className="mr-2 text-indigo-500" />
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Provide a detailed description of your investment proposal"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg h-40"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Category */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <FaTag className="mr-2 text-indigo-500" />
//                 Category
//               </label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Funding Needs */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <FaTag className="mr-2 text-indigo-500" />
//                 Funding Needs
//               </label>
//               <select
//                 value={fundingNeeds}
//                 onChange={(e) => setFundingNeeds(e.target.value)}
//                 className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
//                 required
//               >
//                 <option value="">Select Funding Range</option>
//                 {fundingOptions.map((option) => (
//                   <option key={option} value={option}>{option}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* File Upload */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 flex items-center">
//               <FaUpload className="mr-2 text-indigo-500" />
//               Upload Proposal Document
//             </label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
//               <div className="space-y-1 text-center">
//                 <div className="flex text-sm text-gray-600 justify-center">
//                   <label
//                     htmlFor="file-upload"
//                     className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
//                   >
//                     <span>Upload a file</span>
//                     <input
//                       id="file-upload"
//                       type="file"
//                       onChange={handleFileChange}
//                       className="sr-only"
//                       required
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   PDF, DOCX up to 10MB
//                 </p>
//                 {file && (
//                   <p className="text-sm text-indigo-600 font-medium mt-2">
//                     Selected: {file.name}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end space-x-4 pt-4">
//             <motion.button
//               type="button"
//               onClick={handleClearForm}
//               className="px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Reset
//             </motion.button>
//             <motion.button
//               type="submit"
//               disabled={isSubmitting}
//               className={`px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
//             </motion.button>
//           </div>
//         </form>

//         {/* Success Popup */}
//         {showPopup && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full">
//               <h2 className="text-xl font-semibold text-green-600">Submission Successful!</h2>
//               <p className="mt-4 text-gray-700">Your proposal has been successfully uploaded.</p>
//               <div className="mt-6 flex justify-end space-x-4">
//                 <motion.button
//                   onClick={handleClearForm}
//                   className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 focus:outline-none rounded"
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <FaTimes className="mr-2" />
//                   Close
//                 </motion.button>
//                 <motion.button
//                   onClick={handleClearForm}
//                   className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none rounded"
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <FaCheckCircle className="mr-2" />
//                   Okay
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default ProposalSubmission;
