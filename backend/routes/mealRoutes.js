const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/recommendations", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.clearOldMeals(); // ✅ Remove previous day's meals
    res.json({ meals: user.meals });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});
// In your backend route handler for /api/users/meals

  

router.post("/eat-food", async (req, res) => {
  const { userId, foodName, calories, category } = req.body;
  if (!userId || !foodName || !calories || !category)
    return res.status(400).json({ error: "All fields are required!" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    user.meals.push({ foodName, calories, category, date: today });

    const totalCaloriesConsumed = user.meals.reduce((sum, meal) => sum + meal.calories, 0);
    const remainingCalories = Math.max(user.calorieGoal - totalCaloriesConsumed, 0);

    await user.save();

    res.json({ message: "Meal logged!", remainingCalories, meals: user.meals });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});
router.delete("/remove-food", async (req, res) => {
    const { userId, mealId } = req.body;
  
    if (!userId || !mealId) {
      return res.status(400).json({ error: "User ID and Meal ID are required" });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }
  
      // ✅ Find the meal in user's meals and remove it
      user.meals = user.meals.filter(meal => meal._id.toString() !== mealId);
      
      // ✅ Update remaining calories after meal removal
      const totalEatenCalories = user.meals.reduce((sum, meal) => sum + meal.calories, 0);
      user.remainingCalories = Math.max(user.calorieGoal - totalEatenCalories, 0);
  
      await user.save();
  
      res.json({ message: "Meal removed!", remainingCalories: user.remainingCalories });
    } catch (error) {
      console.error("❌ Error removing meal:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
