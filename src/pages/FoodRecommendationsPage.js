import React, { useEffect, useState } from "react";

const FoodRecommendationsPage = ({ userId: propUserId }) => {  // ✅ Rename propUserId
  const storedUserId = localStorage.getItem("userId");  // ✅ Get from localStorage
  const finalUserId = propUserId || storedUserId;  // ✅ Use either prop or stored value

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!userId) return;
  
    fetch(`http://localhost:5000/api/food/daily-recommendation?userId=${finalUserId}`)
      .then(res => res.json())
      .then(data => {
        console.log("🚀 Fetched Data:", data);
        
        if (!data.recommendations || data.recommendations.length === 0) {
          console.warn("⚠ No recommendations found!");
        }
  
        setCalorieGoal(data.calorieGoal || 0);
        setRecommendations(data.recommendations || []);
      })
      .catch(err => console.error("❌ Error fetching recommendations:", err));
  }, [userId]);
  

  return (
    <div>
      <h2>Food Recommendations</h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((food, index) => (
            <li key={index}>{food.foodName} - {food.calories} kcal</li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default FoodRecommendationsPage;
