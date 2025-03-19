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

// Initialize App
const app = express();
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/food-recommendations', recommendationRoutes);
app.use('/api/food', foodRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
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
