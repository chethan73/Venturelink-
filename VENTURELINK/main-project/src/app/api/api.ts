import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

// Register API call
export const registerUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login API call
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
