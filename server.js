const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const ejs = require('ejs');
const multer = require('multer');
// const upload = multer({ dest: './uploads' }); // Specify the destination folder for uploaded files

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
app.use('/uploads', express.static('uploads'));


app.set('view engine', 'ejs'); // Change 'ejs' to your actual view engine if different
app.set('views', path.join(__dirname, 'views'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const combinedRoutes = require('./routes/login')(upload);
app.use('/', combinedRoutes); // Use the combined routes


app.get('/admin/books/add', (req, res) => {
    res.sendFile(__dirname + '/views/bookForm.html');
});


// Routes
const bookRoutes = require('./routes/adminbookroutes')(upload);
app.use('/admin/books', bookRoutes);

const displaybook = require('./routes/displayBook');
app.use('/books', displaybook);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
