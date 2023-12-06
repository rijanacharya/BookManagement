const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['placed', 'shipped', 'delivered'], default: 'placed' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
