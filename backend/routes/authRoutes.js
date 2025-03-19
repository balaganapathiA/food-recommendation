const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("🔍 Received Login Request:", req.body); // ✅ Debugging log

  const { email, password } = req.body;

  if (!email || typeof email !== "string") {
    console.error("❌ Error: Email is missing or invalid!");
    return res.status(400).json({ message: "Email is required and must be a string." });
  }

  if (!password || typeof password !== "string") {
    console.error("❌ Error: Password is missing or invalid!");
    return res.status(400).json({ message: "Password is required and must be a string." });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({ userId: user._id, name: user.name, token: "fake-jwt-token" }); // ✅ Success response
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});





module.exports = router;
