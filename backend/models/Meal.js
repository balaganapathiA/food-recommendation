const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  foodName: { type: String, required: true },
  calories: { type: Number, required: true },
  category: { type: String, enum: ["Breakfast", "Lunch", "Dinner", "Snack"], required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meal", MealSchema);
