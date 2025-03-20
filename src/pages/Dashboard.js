import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";

const Dashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.userId : null;

  const [calorieGoal, setCalorieGoal] = useState(0);
  const [remainingCalories, setRemainingCalories] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (!userId) return;
  
    // Fetch user data (to get calorie goal)
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 User Data:", data);
        setCalorieGoal(data.calorieGoal || 0);
      })
      .catch((err) => console.error("❌ Error fetching user data:", err));
  
    // Fetch meals and remaining calories
    fetch(`http://localhost:5000/api/users/meals?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Meals and Remaining Calories:", data);
        setRemainingCalories(data.remainingCalories || calorieGoal); // Set remaining calories
      })
      .catch((err) => console.error("❌ Error fetching remaining calories:", err));
  
    // Fetch food recommendations
    fetch(`http://localhost:5000/api/food/daily-recommendation?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔍 Recommendations received:", data.recommendations);
        setRecommendations(data.recommendations || []);
      })
      .catch((err) => console.error("❌ Error fetching recommendations:", err));
  }, [userId]); // Dependencies: Fetch only when userId changes
   // ✅ Dependencies: Fetch only when userId changes

  return (
    <div>
      <h2>Welcome, {storedUser ? storedUser.name : "User"}!</h2>
      {userId ? (
        <>
          <ProfileForm 
            userId={userId} 
            onProfileUpdate={(newCalorieGoal) => {
              setCalorieGoal(newCalorieGoal);
              setRemainingCalories(newCalorieGoal); // Reset remaining calories when user updates profile
            }} 
          />
          <h3>Today's Calorie Goal: {calorieGoal} kcal</h3>
          <h3>Remaining Calories: {remainingCalories} kcal</h3>
          {loading ? ( // Loading state
            <p>Loading...</p>
          ) : (
            <>
              <h3>Today's Food Recommendations</h3>
              {recommendations.length > 0 ? (
                <ul>
                  {recommendations.map((food) => (
                    <li key={food._id}>
                      🍽 {food.foodName} - {food.calories} kcal ({food.category})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>⚠ No recommendations available. Please update your profile.</p>
              )}
            </>
          )}
        </>
      ) : (
        <p>Please log in to see your recommendations.</p>
      )}

      <Link to="/meal-tracking">
        <button>Go to Meal Tracking</button>
      </Link>
    </div>
  );
};

export default Dashboard;
