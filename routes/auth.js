const express = require("express");
const router = express.Router();
const User = require("../models/User"); // ✅ correct import
const jwt = require("jsonwebtoken");


// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // create new user
    const newUser = new User({
      username,
      password
    });

    await newUser.save();

    res.json({ message: "User registered" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;