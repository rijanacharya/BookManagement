const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const multer = require('multer');
const upload = multer({ dest: './uploads' }); // Specify the destination folder for uploaded files

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
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




// Import combined routes
const combinedRoutes = require('./routes/login')(upload);
app.use('/', combinedRoutes); // Use the combined routes

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
