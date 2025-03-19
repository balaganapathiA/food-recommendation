const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  weight: Number, // in kg
  height: Number, // in cm
  age: Number,
  gender: String, // "male" or "female"
  activityLevel: String, // "sedentary", "light", "moderate", "active", "very active"
  calorieGoal: Number, // This will be calculated
});

module.exports = mongoose.model("User", UserSchema);
