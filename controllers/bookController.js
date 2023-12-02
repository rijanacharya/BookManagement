const Book = require('../models/book');
const fs = require('fs').promises;


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
              <a href="/books/add" class="btn btn-primary mb-3">Add New Book</a>
              <ul class="list-group">
                  ${books.map(book => `
                      <li class="list-group-item">
                          <h2>${book.title}</h2>
                          <p>Author: ${book.author}</p>
                          <p>Genre: ${book.genre}</p>
                          <p>Quantity: ${book.quantity}</p>
                          <p>Price: ${book.price}</p>
                          <p>Published Date: ${book.publishedDate}</p>
                          <p>Publisher: ${book.publisher}</p>
                          <p>Reviews: ${book.reviews.join(', ')}</p>
                          ${book.image ? `<img src="data:${book.image.contentType};base64,${book.image.data}" alt="Book Image" style="max-width: 100px; max-height: 100px;">` : ''}
                      </li>
                  `).join('')}
              </ul>
              <a href="/books/add" class="btn btn-primary">Add Book</a>
          </div>

          <!-- Include Bootstrap JS (optional) -->
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
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
    const { title, author, genre, quantity, price, publishedDate, publisher, reviews } = req.body;
    const { fieldname, originalname, encoding, mimetype, buffer, size } = req.file;
    const base64Image = buffer.toString('base64');

   
    const newBook = new Book({
      title,
      author,
      genre,
      quantity,
      price,
      publishedDate,
      publisher,
      reviews: reviews ? reviews.split(',') : [],
      image: {
        data: base64Image,
        contentType: mimetype,
      },
    });
    

    // Save the new book to the database
    await newBook.save();
    
    res.redirect('/books'); // Redirect to the book list page
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
      res.render('editBookForm', { title: 'Edit Book', book });
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
    const { title, author, genre, quantity, price, publishedDate, publisher, reviews } = req.body;

    // Update the book in the database
    await Book.findByIdAndUpdate(bookId, {
      title,
      author,
      genre,
      quantity,
      price,
      publishedDate,
      publisher,
      reviews: reviews ? reviews.split(',') : [],
    });

    res.redirect('/books'); // Redirect to the book list page
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

    res.redirect('/books'); // Redirect to the book list page
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
