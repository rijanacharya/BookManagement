const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();
const { requireLogin } = require('../middleware/authMiddleware'); // Import the authentication middleware


module.exports = function (upload) {
    router.get('/', requireLogin, bookController.index);

    router.get('/add', requireLogin, bookController.addForm);
    router.post('/add', requireLogin, upload.single('image'), bookController.addBook);

    router.get('/edit/:id', requireLogin, bookController.editForm);
    router.post('/edit/:id', requireLogin, upload.single('image'), bookController.editBook);

    router.get('/delete/:id', requireLogin, bookController.deleteBook);


    return router;
};

