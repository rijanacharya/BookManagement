// routes/bookRoutes.js
const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();


module.exports = function (upload) {
router.get('/', bookController.index);

router.get('/add', bookController.addForm);
router.post('/add',upload.single('image'), bookController.addBook);

router.get('/edit/:name', bookController.editForm);
router.post('/edit/:name', bookController.editBook);

router.get('/delete/:name', bookController.deleteBook);


return router;
};

