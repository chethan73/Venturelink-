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
              Startups Dashboard
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
              onClick={() => router.push(`/investor/investments`)
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