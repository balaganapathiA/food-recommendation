import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login User
export const loginUser = async (email, password) => {
  console.log("🔍 Sending Login Data:", { email, password }); // ✅ Debugging log

  if (!email || !password) {
    console.error("❌ Error: Email or password is missing!");
    throw new Error("Email and password are required");
  }

  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }), // ✅ Ensure correct format
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Login Error:", errorData);
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};


// Fetch User Data
export const getUserData = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
