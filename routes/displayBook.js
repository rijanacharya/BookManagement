const express = require('express');
const bookController = require('../controllers/displaybookController');
const router = express.Router();


router.get('/', bookController.displayAllBooks);


router.get('/:id', bookController.displayBookDetail);

router.post('/:id/reviews', bookController.postBookReview);

router.post('/orders/add/:bookId', bookController.addToCart);

module.exports = router;