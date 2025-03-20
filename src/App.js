import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import HealthCalculationsPage from './pages/HealthCalculationsPage';
import FoodRecommendationsPage from './pages/FoodRecommendationsPage';
import MealTrackingPage from './pages/MealTrackingpage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/communnity" element={<Community/>}/>
        <Route path="/health-calculation" element={<HealthCalculationsPage />} />
        <Route path="/food-recommendations" element={<FoodRecommendationsPage />} />
        <Route path="/meal-tracking" element={<MealTrackingPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
