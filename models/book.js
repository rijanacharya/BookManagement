const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    publishedDate: { type: Date },
    publisher: { type: String },
    reviews: [{ type: String }],
    image: {
        data: {
          type: Buffer,
          required: true,
        },
        contentType: {
          type: String,
          required: true,
        },
      },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
