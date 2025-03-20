const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  calories: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  calorieGoal: { type: Number, default: 2000 }, 
  remainingCalories: { type: Number, default: 2000 },
  meals: [mealSchema],
});

userSchema.methods.clearOldMeals = function() {
  const today = new Date();
  this.meals = this.meals.filter(meal => {
    const mealDate = new Date(meal.date);
    return mealDate.toDateString() === today.toDateString();
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
