const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");
const User = require("../models/User");
const Food = require("../models/Food");
const Recommendation = require("../models/Recommendation");
router.get("/recommendations", async (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const meals = await Meal.find({ userId });

    if (!meals.length) {
      return res.status(404).json({ error: "No meal recommendations available" });
    }

    res.json({ meals });
  } catch (error) {
    console.error("❌ Error fetching meal recommendations:", error);
    res.status(500).json({ error: error.message });
  }
});
router.get("/daily-recommendation", async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "User ID is required!" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found!" });

    // ✅ Fetch food recommendations based on user goal
    const recommendations = await Food.find({ goal: user.goal }).limit(5);

    res.json({ calorieGoal: user.calorieGoal, recommendations });
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
