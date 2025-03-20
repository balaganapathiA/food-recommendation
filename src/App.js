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
import RecommendationPage from "./pages/RecommendationPage";
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
        <Route path="/" element={<h1>Welcome to Food Recommender</h1>} />
        <Route path="/recommendation" element={<RecommendationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
