import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("🔍 Sending Login Data:", { email, password });
  
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      console.log("✅ Login Successful:", data);
  
      if (!data.userId || !data.name || !data.token) {
        console.error("❌ Invalid API response, missing user data!");
        return;
      }
  
      // ✅ Store user data properly in localStorage
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("user", JSON.stringify({ userId: data.userId, name: data.name, token: data.token }));
  
      // ✅ Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login Error:", error);
    }
  };
  

  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
