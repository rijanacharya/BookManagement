const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true, unique: true },
    quantity: { type: Number, default: 0 },
    // Add any other properties you need
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;	
