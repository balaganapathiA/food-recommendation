const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // Adjust path if needed


dotenv.config();
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const foodRoutes = require("./routes/foodRoutes"); // ✅ Must be here
const authRoutes = require("./routes/authRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/food-recommender";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// Connect to MongoDB

// ✅ Correct API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/food", foodRoutes); // ✅ Must include this
app.use("/api/recommendations", recommendationRoutes);
console.log("✅ Registered Routes:");
console.log(app._router.stack.map(r => r.route ? r.route.path : r.name));
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
