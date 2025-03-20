import React, { useEffect, useState } from "react";

const MealTrackingPage = () => {
  const userId = localStorage.getItem("userId");
  const [recommendedFoods, setRecommendedFoods] = useState([]);
  const [remainingCalories, setRemainingCalories] = useState(0);
  const [eatenMeals, setEatenMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch meals and calorie data
  const fetchMealsAndCalories = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const mealsRes = await fetch(`http://localhost:5000/api/users/meals?userId=${userId}`);
      const mealsData = await mealsRes.json();

      console.log("✅ Meals Data:", mealsData);

      if (Array.isArray(mealsData.meals)) {
        setEatenMeals(mealsData.meals);

        // ✅ Calculate new remaining calories after eating meals
        const totalEatenCalories = mealsData.meals.reduce((sum, meal) => sum + meal.calories, 0);
        
        // Fetch the latest calorie goal and update remaining calories
        const recRes = await fetch(`http://localhost:5000/api/food/daily-recommendation?userId=${userId}`);
        const recData = await recRes.json();

        console.log("✅ Recommendations Data:", recData);
        setRecommendedFoods(recData.recommendations || []);
        setRemainingCalories(Math.max(recData.calorieGoal - totalEatenCalories, 0)); // ✅ Prevents negative values
      }
    } catch (err) {
      console.error("❌ Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealsAndCalories(); // ✅ Fetch data on component mount
  }, [userId]);

  // ✅ Handle food logging
  const handleEatFood = async (food) => {
    if (remainingCalories <= 0) {
      alert("You have reached your calorie goal for the day.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/meals/eat-food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, foodName: food.foodName, calories: food.calories, category: food.category }),
    });

    const data = await response.json();
    console.log("✅ Food Logged:", data);

    if (data.remainingCalories !== null) {
      console.log("✅ New Remaining Calories:", data.remainingCalories); // ✅ Debugging Log
      setRemainingCalories(Math.max(data.remainingCalories, 0)); // ✅ Prevent negative calories
    }

    setEatenMeals((prev) => [...prev, food]); // ✅ Append meal to state
  };

  // ✅ Handle food removal
  const handleRemoveFood = async (mealId) => {
    try {
      const response = await fetch("http://localhost:5000/api/meals/remove-food", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, mealId }),
      });

      const data = await response.json();
      console.log("✅ Food Removed:", data);

      if (data.remainingCalories !== null) {
        setRemainingCalories(data.remainingCalories);
        console.log("mel:"+data.remainingCalories); // ✅ Update remaining calories after removing food
      }

      // ✅ Remove meal from UI
      setEatenMeals(prev => prev.filter(meal => meal._id !== mealId));

    } catch (err) {
      console.error("❌ Error removing meal:", err);
    }
  };

  return (
    <div>
      <h2>Meal Tracking</h2>
      <h3>Remaining Calories: {remainingCalories} kcal</h3>

      {loading && <p>Loading...</p>} {/* Loading Indicator */}

      <h3>Recommended Foods</h3>
      {recommendedFoods.length > 0 ? (
        <ul>
          {recommendedFoods.map((food, index) => (
            <li key={food._id || index}>
              {food.foodName} - {food.calories} kcal
              <button onClick={() => handleEatFood(food)}>I Ate This</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations yet.</p>
      )}

      <h3>Meals You Ate Today</h3>
      {eatenMeals.length > 0 ? (
        <ul>
          {eatenMeals.map((meal, index) => (
            <li key={meal._id || index}>
              {meal.foodName} - {meal.calories} kcal
              <button onClick={() => handleRemoveFood(meal._id)}>❌ Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No meals logged yet.</p>
      )}
    </div>
  );
};

export default MealTrackingPage;
