const express = require("express");
const User = require("../models/User");
const router = express.Router();

// ✅ Ensure route exists
router.post("/update-profile", async (req, res) => {
  console.log("🔍 Received Profile Update Request:", req.body); // ✅ Debugging log

  const { userId, weight, height, age, gender, activityLevel } = req.body;

  if (!userId || !weight || !height || !age || !gender || !activityLevel) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // ✅ Dynamic Calorie Calculation
  const bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
  };

  const calorieGoal = Math.round(bmr * (activityFactors[activityLevel] || 1.2)); // ✅ Ensure valid activity level

  try {
    await User.findByIdAndUpdate(userId, { weight, height, age, gender, activityLevel, calorieGoal });
    res.json({ message: "Profile updated", calorieGoal });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
