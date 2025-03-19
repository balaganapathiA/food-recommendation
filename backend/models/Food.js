const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  Food_items: { type: String, required: true },
  Breakfast: { type: Boolean, default: false },
  Lunch: { type: Boolean, default: false },
  Dinner: { type: Boolean, default: false },
  VegNovVeg: { type: String, required: false },
  Calories: { type: Number, required: true },
  Fats: { type: Number, required: false },
  Proteins: { type: Number, required: false },
  Iron: { type: Number, required: false },
  Calcium: { type: Number, required: false },
  Sodium: { type: Number, required: false },
  Potassium: { type: Number, required: false },
  Carbohydrates: { type: Number, required: false },
  Fibre: { type: Number, required: false },
  VitaminD: { type: Number, required: false },
  Sugars: { type: Number, required: false },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
