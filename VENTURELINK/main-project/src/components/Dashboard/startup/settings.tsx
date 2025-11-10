'use client';
import React, { useState, useEffect } from "react";
import { FiEdit, FiCheck, FiX } from "react-icons/fi";

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    number: "",
    role: "",
    sector: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("user_id");
    console.log("user_id", savedData);
    if (savedData) {
      const data = JSON.parse(savedData);
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setError("User ID not found in localStorage.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const updatedData = {
      id: userId,
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:5000/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully!");
        setEditingField(null);
      } else {
        setError(result.error || "Failed to update profile.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (field: string) => {
    setEditingField(field);
  };

  const cancelEditing = () => {
    setEditingField(null);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white">
      {/* WhatsApp-style header */}
      <div className="bg-emerald-600 text-white p-4 flex items-center">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
      </div>

      {/* Profile Picture Placeholder */}
      <div className="flex flex-col items-center py-6 border-b">
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-3 flex items-center justify-center text-gray-500">
          <span className="text-2xl">👤</span>
        </div>
        <button className="text-emerald-600 text-sm font-medium">Change profile photo</button>
      </div>

      {/* Form Fields - WhatsApp Style */}
      <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
        {message && (
          <div className="p-3 bg-green-100 text-green-700 text-sm text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-500 text-sm">Full Name</label>
            {editingField !== 'full_name' ? (
              <button 
                type="button" 
                onClick={() => startEditing('full_name')}
                className="text-emerald-600 text-sm"
              >
                <FiEdit size={16} />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  type="submit" 
                  className="text-emerald-600"
                  disabled={isLoading}
                >
                  <FiCheck size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={cancelEditing}
                  className="text-gray-500"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
          </div>
          {editingField === 'full_name' ? (
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-2 border-b border-emerald-600 focus:outline-none"
              autoFocus
            />
          ) : (
            <div className="text-gray-800">{formData.full_name || "Not set"}</div>
          )}
        </div>

        {/* Email */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-500 text-sm">Email</label>
            {editingField !== 'email' ? (
              <button 
                type="button" 
                onClick={() => startEditing('email')}
                className="text-emerald-600 text-sm"
              >
                <FiEdit size={16} />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  type="submit" 
                  className="text-emerald-600"
                  disabled={isLoading}
                >
                  <FiCheck size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={cancelEditing}
                  className="text-gray-500"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
          </div>
          {editingField === 'email' ? (
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border-b border-emerald-600 focus:outline-none"
              autoFocus
            />
          ) : (
            <div className="text-gray-800">{formData.email || "Not set"}</div>
          )}
        </div>

        {/* Phone Number */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-500 text-sm">Phone Number</label>
            {editingField !== 'number' ? (
              <button 
                type="button" 
                onClick={() => startEditing('number')}
                className="text-emerald-600 text-sm"
              >
                <FiEdit size={16} />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  type="submit" 
                  className="text-emerald-600"
                  disabled={isLoading}
                >
                  <FiCheck size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={cancelEditing}
                  className="text-gray-500"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
          </div>
          {editingField === 'number' ? (
            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-2 border-b border-emerald-600 focus:outline-none"
              autoFocus
            />
          ) : (
            <div className="text-gray-800">{formData.number || "Not set"}</div>
          )}
        </div>

        {/* Password */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-500 text-sm">Password</label>
            {editingField !== 'password' ? (
              <button 
                type="button" 
                onClick={() => startEditing('password')}
                className="text-emerald-600 text-sm"
              >
                <FiEdit size={16} />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  type="submit" 
                  className="text-emerald-600"
                  disabled={isLoading}
                >
                  <FiCheck size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={cancelEditing}
                  className="text-gray-500"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
          </div>
          {editingField === 'password' ? (
            <>
              <input
                name="password"
                type="password"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border-b border-emerald-600 focus:outline-none mb-2"
                autoFocus
              />
              <input
                name="confirm_password"
                type="password"
                placeholder="Confirm password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full p-2 border-b border-emerald-600 focus:outline-none"
              />
            </>
          ) : (
            <div className="text-gray-800">••••••••</div>
          )}
        </div>

        {/* Role */}
        <div className="p-4">
          <label className="text-gray-500 text-sm block mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border-b border-gray-300 focus:border-emerald-600 focus:outline-none"
          >
            <option value="">Select your role</option>
            <option value="investor">Investor</option>
            <option value="startup">Startup</option>
          </select>
        </div>

        {/* Sector */}
        <div className="p-4">
          <label className="text-gray-500 text-sm block mb-1">Sector</label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full p-2 border-b border-gray-300 focus:border-emerald-600 focus:outline-none"
          >
            <option value="">Select your sector</option>
            <option value="IT">IT</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="p-4">
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;