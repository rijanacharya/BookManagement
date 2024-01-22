// models/review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    content: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
