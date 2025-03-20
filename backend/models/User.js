const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  foodName: String,
  calories: Number,
  category: String,
  date: { type: Date, default: Date.now } // ✅ Store timestamp
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  calorieGoal: Number,
  meals: [mealSchema], // ✅ Store daily meals
});

userSchema.methods.clearOldMeals = function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  this.meals = this.meals.filter(meal => new Date(meal.date) >= today);
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
