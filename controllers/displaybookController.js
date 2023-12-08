const Book = require('../models/book');
const Review = require('../models/reviews')
const Customer = require('../models/customer')
const fs = require('fs');
const express = require('express');

const router = express.Router();
const path = require('path');



async function displayAllBooks(req, res) {
  try {
    // Fetch all books from the database
    const books = await Book.find();

    // Render a view with all books
    res.render('combineBooks', { books });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error);
    res.status(500).send('Internal Server Error');
  }


}

// Controller method to display a detailed view of a specific book
async function displayBookDetail(req, res) {
  try {
    // Extract the book ID from the request parameters
    const bookId = req.params.id;

    // Fetch the book with the specified ID from the database
    const book = await Book.findById(bookId).populate({
      path: 'reviews',
      populate: { path: 'customer', select: 'username' } // Populate the 'customer' field with the 'username'
    });

    // Render a view with the detailed information for the specific book

    res.render('eachBook', { book });

  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

}

async function postBookReview(req, res) {
  try {
    const bookId = req.params.id;
    const { content } = req.body;

    // Assuming you have a user authentication system and a user ID available
    const userId = req.session.userId; // Replace with the actual user ID
    console.log(userId);
    if (!userId) {
      return res.status(401).send('User not authenticated');
    }

    // Create a new review
    const newReview = new Review({
      customer: userId, // Associate the review with the authenticated user
      book: bookId,
      content,
    });

    // Save the new review to the database
    await newReview.save();

    // Associate the review with the book
    const book = await Book.findById(bookId);
    book.reviews.push(newReview._id);
    await book.save();

    res.redirect(`/books/${bookId}`); // Redirect to the book reviews page
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


//   // Handle book search

async function searchBooks(req, res) {
  try {
    const { searchTerm } = req.query;
    console.log('Received search term:', searchTerm);

    // Assuming your Book model is called Book and has a 'title' field
    const books = await Book.find({ title: { $regex: new RegExp(searchTerm, 'i') } });

    

    res.status(200).json({ results: books });
  } catch (error) {
    console.error('Error in searchBooks endpoint:', error);
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  displayAllBooks,
  displayBookDetail,
  postBookReview,
  searchBooks,
};