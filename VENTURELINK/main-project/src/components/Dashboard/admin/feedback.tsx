"use client"; // Add this for Next.js 13+ if needed

import { useEffect, useState } from "react";
import axios from "axios";

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  role: string;
  created_at: string;
}

const AdminSupport = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]); // ✅ Always an array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("/api/getsupport");
        setFeedback(response.data.messages);
      } catch (err) {
        setError("Failed to fetch feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-semibold mb-6 text-center text-gray-900 animate__animated animate__fadeIn">
        Help & Support Feedback
      </h2>

      {loading && (
        <div className="flex justify-center items-center space-x-3 animate__animated animate__fadeIn">
          <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">Loading feedback...</p>
        </div>
      )}

      {error && (
        <p className="text-xl text-red-600 text-center animate__animated animate__fadeIn">
          {error}
        </p>
      )}

      {!loading && !error && feedback.length === 0 && (
        <p className="text-lg text-gray-600 text-center animate__animated animate__fadeIn">
          No feedback found.
        </p>
      )}

      {!loading && !error && feedback.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <table className="w-full border-collapse table-auto animate__animated animate__fadeIn">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-2 text-sm font-semibold text-gray-600">ID</th>
                <th className="border p-2 text-sm font-semibold text-gray-600">Name</th>
                <th className="border p-2 text-sm font-semibold text-gray-600">Email</th>
                <th className="border p-2 text-sm font-semibold text-gray-600">Message</th>
                <th className="border p-2 text-sm font-semibold text-gray-600">Role</th>
                <th className="border p-2 text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-blue-50 transition-all duration-300 ease-in-out animate__animated animate__fadeIn"
                >
                  <td className="border p-4 text-sm text-gray-800">{item.id}</td>
                  <td className="border p-4 text-sm text-gray-800">{item.name}</td>
                  <td className="border p-4 text-sm text-gray-800">{item.email}</td>
                  <td className="border p-4 text-sm text-gray-800">{item.message}</td>
                  <td className="border p-4 text-sm text-gray-800">{item.role}</td>
                  <td className="border p-4 text-sm text-gray-800">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;
