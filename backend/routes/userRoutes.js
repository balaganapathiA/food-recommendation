const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/meals", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.clearOldMeals(); // Ensure old meals are removed

    const totalCaloriesConsumed = user.meals.reduce((sum, meal) => sum + meal.calories, 0);
    const remainingCalories = Math.max(user.calorieGoal - totalCaloriesConsumed, 0);
      
    res.json({ meals: user.meals || [], remainingCalories });
  } catch (error) {
    console.error("❌ Error fetching meals:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.post("/eat-food", async (req, res) => {
  const { userId, foodName, calories, category } = req.body;

  if (!userId || !foodName || !calories || !category) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const newMeal = { foodName, calories, category, date: new Date() };
    user.meals.push(newMeal);
    
    // ✅ Subtract calories from remainingCalories
    user.remainingCalories = Math.max(user.remainingCalories - calories, 0);

    await user.save();
    
    res.json({ message: "Meal logged!", remainingCalories: user.remainingCalories, meals: user.meals });

  } catch (error) {
    console.error("❌ Error logging meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User profile not found!" });
    }

    console.log("✅ Fetching Profile:", user);
    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/update-profile", async (req, res) => {
  const { userId, weight, height, age, gender, activityLevel } = req.body;

  if (!userId || !weight || !height || !age || !gender || !activityLevel) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log("🔍 Received Profile Update Request:", req.body);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // ✅ Update user profile fields
    user.weight = weight;
    user.height = height;
    user.age = age;
    user.gender = gender;
    user.activityLevel = activityLevel;

    // ✅ Recalculate Daily Calorie Goal
    user.calorieGoal = Math.round(10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161));

    await user.save();

    console.log("✅ Profile Updated Successfully:", user);
    res.json({ message: "Profile updated", calorieGoal: user.calorieGoal });

  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

console.log("✅ userRoutes.js is loaded!");

module.exports = router;
