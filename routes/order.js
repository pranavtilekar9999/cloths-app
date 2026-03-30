const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ PLACE ORDER
router.post("/", async (req, res) => {
  try {
    const { items } = req.body;

    const newOrder = new Order({
      items
    });

    await newOrder.save();

    res.json({ message: "Order placed successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order failed" });
  }
});

module.exports = router;