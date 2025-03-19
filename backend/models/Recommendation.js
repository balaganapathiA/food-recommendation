const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  foodName: { type: String, required: true },
  calories: { type: Number, required: true },
  category: { type: String, required: true },
  goal: { type: String, enum: ['maintain', 'gain', 'lose'], required: true }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
