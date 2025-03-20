const express = require("express");
const Food = require("../models/Food");
const User = require("../models/User");
const mongoose = require("mongoose");
const Recommendation = require("../models/Recommendation");
const router = express.Router();

router.get("/daily-recommendations", async (req, res) => {
  console.log("🔍 Received Query:", req.query);

  let { userId } = req.query;
  if (!userId) {
    console.error("❌ Missing userId in request!");
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Find recommendations
    const recommendations = await Recommendation.find({ userId });

    if (!recommendations || recommendations.length === 0) {
      console.warn("⚠️ No recommendations found for user:", userId);
      return res.status(404).json({ error: "No recommendations available." });
    }

    console.log("✅ Returning Recommendations:", recommendations);
    res.json({ recommendations }); // ✅ Always return JSON
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    res.status(500).json({ error: "Internal server error" }); // ✅ Always return JSON on error
  }
});



router.post("/some-endpoint", async (req, res) => {
  console.log("🔍 Received Request:", req.body); // ✅ Debugging log

  if (!req.body || Object.keys(req.body).length === 0) {
    console.error("❌ Request body is empty!");
    return res.status(400).json({ error: "Empty request body" });
  }

  // Continue processing...
});
module.exports = router;
