const express = require('express');
const bookController = require('../controllers/displaybookController');
const router = express.Router();

router.get('/search', bookController.searchBooks);

router.get('/', bookController.displayAllBooks);


router.get('/:id', bookController.displayBookDetail);

router.post('/:id/reviews', bookController.postBookReview);


module.exports = router;