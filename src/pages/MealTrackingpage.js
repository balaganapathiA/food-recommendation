import React, { useEffect, useState } from "react";

const MealTrackingPage = () => {
  const userId = localStorage.getItem("userId");
  const [recommendedFoods, setRecommendedFoods] = useState([]);
  const [remainingCalories, setRemainingCalories] = useState(0);
  const [eatenMeals, setEatenMeals] = useState([]);

  // ✅ Fetch recommended foods & remaining calories
  useEffect(() => {
    if (!userId) return;
  
    console.log("🔍 Fetching recommendations for userId:", userId);
  
    fetch(`http://localhost:5000/api/meals/recommendations?userId=${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        return res.json();
      })
      .then(data => {
        console.log("✅ Fetched Data:", data);
        setRecommendedFoods(data.recommendations || []);
        setRemainingCalories(data.remainingCalories || 0);
      })
      .catch(err => console.error("❌ Error fetching recommendations:", err));
  }, [userId]);
  

  // ✅ User confirms they ate food
  const handleEatFood = async (food) => {
    console.log("📤 Sending Request:", { userId, foodName: food.foodName, calories: food.calories, category: food.category });
  
    const response = await fetch("http://localhost:5000/api/meals/eat-food", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ userId, foodName: food.foodName, calories: food.calories, category: food.category }),
    });
  
    if (!response.ok) {
      console.error("❌ API Error:", await response.text());
      return;
    }
  
    const data = await response.json();
    console.log("✅ Meal logged:", data);
  
    // ✅ Update remaining calories in state
    setRemainingCalories(data.remainingCalories);
    setEatenMeals(prevMeals => [...prevMeals, food]); 
  };
  
  
  return (
    <div>
      <h2>Meal Tracking</h2>
      <h3>Remaining Calories: {remainingCalories} kcal</h3>

      <h3>Recommended Foods</h3>
      <ul>
        {recommendedFoods.length > 0 ? (
          recommendedFoods.map((food, index) => (
            <li key={index}>
              {food.foodName} - {food.calories} kcal
              <button onClick={() => handleEatFood(food)}>I Ate This</button> {/* ✅ Confirm food eaten */}
            </li>
          ))
        ) : (
          <p>No recommendations yet.</p>
        )}
      </ul>

      <h3>Meals You Ate Today</h3>
      <ul>
        {eatenMeals.length > 0 ? (
          eatenMeals.map((meal, index) => (
            <li key={index}>{meal.foodName} - {meal.calories} kcal</li>
          ))
        ) : (
          <p>No meals logged yet.</p>
        )}
      </ul>
    </div>
  );
};

export default MealTrackingPage;
