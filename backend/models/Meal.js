const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  foodName: String,
  calories: Number,
  category: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meal", mealSchema);
