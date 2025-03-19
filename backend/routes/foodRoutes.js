const express = require("express");
const Food = require("../models/Food");
const User = require("../models/User");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/daily-recommendation", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required!" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid User ID format!" });
  }

  try {
    const user = await User.findById(userId);
    console.log("User Found:", user); // ✅ Log user details

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (!user.calorieGoal) {
      return res.status(400).json({ error: "Calorie goal not set. Please update your profile!" });
    }

    const recommendedFoods = await Food.find({});
    res.json({ calorieGoal: user.calorieGoal, recommendations: recommendedFoods });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
