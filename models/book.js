const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    publishedDate: { type: Date },
    publisher: { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // Reference to Review model
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
