import React, { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";

const Dashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.userId : null;

  const [calorieGoal, setCalorieGoal] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }

    // ✅ Fetch User Profile to Get Updated Calorie Goal
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((res) => res.json())
      .then((userData) => {
        if (userData.calorieGoal) {
          setCalorieGoal(userData.calorieGoal);
        }
      })
      .catch((error) => console.error("Error fetching user profile:", error));

    // ✅ Fetch Food Recommendations Based on Calorie Goal
    fetch(`http://localhost:5000/api/food/daily-recommendation?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data.recommendations || []);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setRecommendations([]);
      });
  }, [userId]);

  return (
    <div>
      <h2>Welcome, {storedUser ? storedUser.name : "User"}!</h2>
      {userId ? (
        <>
          <ProfileForm userId={userId} onProfileUpdate={setCalorieGoal} />
          <h3>Today's Calorie Goal: {calorieGoal ? `${calorieGoal} kcal` : "Loading..."}</h3>
          <h3>Today's Food Recommendations</h3>
          {recommendations.length > 0 ? (
            <ul>
              {recommendations.map((food, index) => (
                <li key={index}>{food.foodName} - {food.calories} kcal</li>
              ))}
            </ul>
          ) : (
            <p>No recommendations available.</p>
          )}
        </>
      ) : (
        <p>Please log in to see your recommendations.</p>
      )}
    </div>
  );
};

export default Dashboard;
