const Book = require('../models/book');
const Review = require('../models/reviews')
const Customer = require('../models/customer')
const fs = require('fs');
const express = require('express');
const multer = require('multer'); // For handling file uploads
const router = express.Router();
const path = require('path');


// Display list of all books
exports.index = async function (req, res) {


  try {
    const books = await Book.find({});
    res.render('bookList', { books });
  } catch (error) {
    console.error('Error fetching book data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


};

// Display book create form on GET
exports.addForm = function (req, res) {
  res.render('bookForm', { title: 'Add Book' });
};

// Handle book create on POST
exports.addBook = async function (req, res) {

  try {
    const { title, details, author, genre, quantity, price, publishedDate, publisher, reviews } = req.body;
    const { fieldname, originalname, encoding, mimetype, buffer, size } = req.file;
    const base64Image = buffer.toString('base64');


    const newBook = new Book({
      title,
      details,
      author,
      genre,
      quantity,
      price,
      publishedDate,
      publisher,
      image: {
        data: base64Image,
        contentType: mimetype,
      },
    });


    // Save the new book to the database
    await newBook.save();

    const imagePath = path.join(__dirname, '../public/images', `${newBook._id}.${mimetype.split('/')[1]}`);
    fs.writeFileSync(imagePath, buffer);

    res.redirect('/admin/books'); // Redirect to the book list page
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// Display book update form on GET
exports.editForm = async function (req, res) {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).send('Book not found');
    } else {
      const filePath = path.join(__dirname, '../views', 'editBookForm.html');
      const formHtml = fs.readFileSync(filePath, 'utf8').replace('BOOK_ID', bookId);


      // Send the HTML file directly
      res.send(formHtml);;
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// Handle book update on POST
exports.editBook = async function (req, res) {
  try {
    const bookId = req.params.id;
    const { title, details, author, genre, quantity, price, publishedDate, publisher, reviews } = req.body;
    const { fieldname, originalname, encoding, mimetype, buffer, size } = req.file;
    const base64Image = buffer.toString('base64');

    // Update the book in the database
    await Book.findByIdAndUpdate(bookId, {
      title,
      details,
      author,
      genre,
      quantity,
      price,
      publishedDate,
      publisher,

      image: {
        data: base64Image,
        contentType: mimetype,
      },
    });

    res.redirect('/admin/books'); // Redirect to the book list page
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
//































































































// Handle book delete on GET
exports.deleteBook = async function (req, res) {
  try {
    const bookId = req.params.id;

    // Delete the book from the database
    await Book.findOneAndDelete({ _id: bookId });


    res.redirect('/admin/books'); // Redirect to the book list page
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
