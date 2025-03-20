const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const foodRoutes = require('./routes/foodRoutes');
const mealRoutes = require("./routes/mealRoutes");


// Initialize App
const app = express();
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());
app.use(express.json()); // ✅ Ensure JSON parsing
app.use(bodyParser.json()); // ✅ Handle JSON body parsing
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/food/daily-recommendation', recommendationRoutes);
// app.use('/api/food-recommendations', recommendationRoutes);
app.use('/api/food', foodRoutes);
app.use("/api/meals", mealRoutes);

// Global Error Handler
app.use((req, res, next) => {
  console.log(`🔍 [${req.method}] ${req.url}`);
  console.log("📥 Request Headers:", req.headers);
  console.log("📦 Request Body:", req.body);
  next();
});

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB().then(() => {
    // console.log("Connected to MongoDB:", mongoose.connection.name);
    console.log("Collections Available:", Object.keys(mongoose.connection.collections));
  });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
