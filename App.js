const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3003;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/inventory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose model and schema for Inventory
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

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Middleware to serve static files (HTML, scripts, styles, etc.)
app.use(express.static("View"));
app.use("/scripts", express.static("scripts"));

// Route to get all inventory items
app.get("/inventory", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add new inventory items
app.post("/inventory", async (req, res) => {
  const { bookName, quantity } = req.body;

  try {
    // Try to find an existing inventory item with the same bookName
    const existingInventory = await Inventory.findOne({ bookName });

    if (existingInventory) {
      // If found, update the quantity
      existingInventory.quantity += quantity;
      await existingInventory.save();
      res.json(existingInventory);
    } else {
      // If not found, create a new inventory item
      const newInventory = await Inventory.create({ bookName, quantity });
      res.json(newInventory);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
