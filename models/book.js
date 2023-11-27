const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    // Add any other properties you need
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
