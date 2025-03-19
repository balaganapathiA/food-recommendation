import React, { useEffect, useState } from "react";

const FoodRecommendationsPage = ({ userId: propUserId }) => {  // ✅ Rename propUserId
  const storedUserId = localStorage.getItem("userId");  // ✅ Get from localStorage
  const finalUserId = propUserId || storedUserId;  // ✅ Use either prop or stored value

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!finalUserId) {
      console.error("User ID is missing!");
      return;
    }

    fetch(`http://localhost:5000/api/food/daily-recommendation?userId=${finalUserId}`)
      .then(res => res.json())
      .then(data => setRecommendations(data.recommendations || []))
      .catch(error => console.error("Error fetching recommendations:", error));
  }, [finalUserId]);

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
