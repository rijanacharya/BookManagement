// routes/bookRoutes.js
const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();


module.exports = function (upload) {
router.get('/', bookController.index);

router.get('/add', bookController.addForm);
router.post('/add',upload.single('image'), bookController.addBook);

router.get('/edit/:id', bookController.editForm);
router.post('/edit/:id',upload.single('image'), bookController.editBook);

router.get('/delete/:id', bookController.deleteBook);


return router;
};

