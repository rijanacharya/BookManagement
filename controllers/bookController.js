const Book = require('../models/book');
const Review=require('../models/reviews')
const Customer=require('../models/customer')
const fs = require('fs');
const express = require('express');
const multer = require('multer'); // For handling file uploads
const router = express.Router();
const path = require('path');


// Display list of all books
exports.index =async function (req, res) {
    try {
        // Fetch the book data, for example using Book.find({}...)
        const books = await Book.find({});
        
        const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Book List</title>
          <!-- Include Bootstrap CSS from CDN -->
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      </head>
      <body>
          <div class="container">
              <h1 class="mt-5 mb-4">Book List</h1>
              <a href="/admin/books/add" class="btn btn-primary mb-3">Add New Book</a>
              <ul class="list-group">
                  ${books.map(book => `
                      <li class="list-group-item">
                          <h2>${book.title}</h2>
                          <p>Author: ${book.author}</p>
                          <p>Details: ${book.details}
                          <p>Genre: ${book.genre}</p>
                          <p>Quantity: ${book.quantity}</p>
                          <p>Price: ${book.price}</p>
                          <p>Published Date: ${book.publishedDate}</p>
                          <p>Publisher: ${book.publisher}</p>
                      
                          ${book.image ? `<img src="data:${book.image.contentType};base64,${book.image.data}" alt="Book Image" style="max-width: 100px; max-height: 100px;">` : ''}
                          <button class="btn btn-info" onclick="editBook('${book._id}')">Edit</button>
                          <button class="btn btn-info" onclick="deleteBook('${book._id}')">Delete</button>

                          </li>
                  `).join('')}
              </ul>
          </div>

          <!-- Include Bootstrap JS (optional) -->
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

          <script>
              function editBook(bookId) {
                  // You can redirect to the edit page with the bookId or perform other actions
                  window.location.href = '/admin/books/edit/' + bookId;
              }
              function deleteBook(bookId) {
                // You can redirect to the edit page with the bookId or perform other actions
                window.location.href = '/admin/books/delete/' + bookId;
            }
          </script>
      </body>
      </html>
  `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(htmlContent);

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
    const { title,details, author, genre, quantity, price, publishedDate, publisher, reviews } = req.body;
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
    const { title,details, author, genre, quantity, price, publishedDate, publisher, reviews } = req.body;
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

// Handle book delete on GET
exports.deleteBook = async function (req, res) {
  try {
    const bookId = req.params.id;

    // Delete the book from the database
    await Book.findByIdAndRemove(bookId);

    res.redirect('/admin/books'); // Redirect to the book list page
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};