const Inventory = require("../models/inventory");

// Controller for handling inventory-related logic
const inventoryController = {
  // Fetch and render the inventory page
  getInventory: async (req, res) => {
    try {
      const inventoryData = await Inventory.find().populate("book");
      res.render("inventoryPage", { inventory: inventoryData });
    } catch (error) {
      console.error("Error fetching inventory:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  // Render the page for updating quantity
  getUpdateQuantityPage: async (req, res) => {
    try {
      const bookId = req.params.id;
      const bookDetails = await Inventory.findOne({ book: bookId }).populate(
        "book"
      );

      if (!bookDetails) {
        return res.status(404).send("Book not found");
      }

      res.render("updateQuantityPage", { book: bookDetails });
    } catch (error) {
      console.error("Error fetching book details:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  // Handle updating quantity
  postUpdateQuantity: async (req, res) => {
    try {
      const bookId = req.params.id;
      const updatedQuantity = req.body.quantity;

      await Inventory.findOneAndUpdate(
        { book: bookId },
        { quantity: updatedQuantity }
      );

      res.redirect("/inventory");
    } catch (error) {
      console.error("Error updating book quantity:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = inventoryController;
