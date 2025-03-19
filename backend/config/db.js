const mongoose = require("mongoose");
require("dotenv").config(); // ✅ Load environment variables

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  console.log("🔍 Debug: MONGO_URI =", MONGO_URI); // ✅ Debugging log

  if (!MONGO_URI) {
    console.error("❌ Error: MONGO_URI is not defined in .env file");
    process.exit(1); // Stop the server if MONGO_URI is missing
  }

  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/food-recommender", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connecteed: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Stop the server on failure
  }
};

module.exports = connectDB;
