const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
