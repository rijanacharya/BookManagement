const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Handle MongoDB connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



// Set up middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // Set EJS as the view engine

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



  app.get('/books/add', (req, res) => {
    res.sendFile(__dirname + '/views/bookForm.html');
  });


// Routes
const bookRoutes = require('./routes/routes')(upload);
app.use('/books', bookRoutes); // Assuming your routes are prefixed with '/books'



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
