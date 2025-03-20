const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Recommendation = require("../models/Recommendation");

router.get("/recommendations", async (req, res) => {
    console.log("🔍 API Called: /api/meals/recommendations", req.query);
  
    const { userId } = req.query;
    if (!userId) {
      console.error("❌ Missing userId in request!");
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.error("❌ User not found:", userId);
        return res.status(404).json({ error: "User not found" });
      }
  
      const recommendations = await Recommendation.find({ userId });
  
      if (!recommendations.length) {
        console.warn("⚠️ No recommendations found for user:", userId);
        return res.status(404).json({ error: "No recommendations available." });
      }
  
      console.log("✅ Returning Recommendations:", recommendations);
      res.json({ recommendations, remainingCalories: user.calorieGoal });
    } catch (error) {
      console.error("❌ Error fetching recommendations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  router.post("/eat-food", async (req, res) => {
    console.log("🔍 Received Request Body:", req.body); // ✅ Debugging log
  
    const { userId, foodName, calories, category } = req.body;
    if (!userId || !foodName || !calories || !category) {
      console.error("❌ Missing required fields!");
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.error("❌ User not found:", userId);
        return res.status(404).json({ error: "User not found" });
      }
  
      // Add food to logged meals (or update daily calorie intake)
      user.calorieGoal = Math.max(user.calorieGoal - calories, 0); // Prevent negative values
      await user.save();
  
      console.log("✅ Updated User Calorie Goal:", user.calorieGoal);
      res.json({ message: "Meal logged successfully", remainingCalories: user.calorieGoal });
    } catch (error) {
      console.error("❌ Error logging meal:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
module.exports = router;
