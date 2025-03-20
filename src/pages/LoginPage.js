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
      const response = await loginUser(email, password);
      console.log("✅ Login Successful:", response);
  
      // ✅ Store user details in localStorage
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("userId", response.userId); // ✅ Ensure userId is stored
  
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login Failed:", error.message);
      alert("Login Failed: " + error.message);
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
