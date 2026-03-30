const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array
});

module.exports = mongoose.model("Order", orderSchema);