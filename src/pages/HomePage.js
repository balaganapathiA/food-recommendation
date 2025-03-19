import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to the Food Recommender System</h1>
      <p>Get personalized food recommendations based on your health goals!</p>
      <Link to="/login" className="btn">Login</Link>
      <Link to="/register" className="btn">Register</Link>
    </div>
  );
}

export default HomePage;