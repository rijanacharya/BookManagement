const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();
const { requireLogin, requireAdmin } = require('../middleware/authMiddleware'); // Import the authentication middleware


module.exports = function (upload) {
    router.get('/', requireLogin, requireAdmin, bookController.index);

    router.get('/add', requireLogin, requireAdmin, bookController.addForm);
    router.post('/add', requireLogin, requireAdmin, upload.single('image'), bookController.addBook);

    router.get('/edit/:id', requireLogin, requireAdmin, bookController.editForm);
    router.post('/edit/:id', requireLogin, requireAdmin, upload.single('image'), bookController.editBook);

    router.get('/delete/:id', requireLogin, requireAdmin, bookController.deleteBook);


    return router;
};

