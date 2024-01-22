const express = require('express');
const bookController = require('../controllers/displaybookController');
const router = express.Router();
const { requireLogin } = require('../middleware/authMiddleware'); // Import the authentication middleware


router.get('/search', bookController.searchBooks);

router.get('/', bookController.displayAllBooks);


router.get('/:id', requireLogin, bookController.displayBookDetail);

router.post('/:id/reviews', requireLogin, bookController.postBookReview);


module.exports = router;