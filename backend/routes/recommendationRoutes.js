const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Food = require("../models/Food");
const calculateCalorieGoal = require("../utils/calorieUtils");


router.get("/daily-recommendation", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
      return res.status(400).json({ error: "User ID is required!" });
  }

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found!" });
      }

      const recommendations = await Recommendation.find({ userId });
      res.json({ calorieGoal: user.calorieGoal, recommendations });

  } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
