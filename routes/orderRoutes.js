// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/orderController');
const { requireLogin } = require('../middleware/authMiddleware'); // Import the authentication middleware


// Define routes
router.post('/addtocart/:bookId', requireLogin, cartController.addToCart);
router.get('/cart', requireLogin, cartController.viewCart);
router.post('/place-order', requireLogin, cartController.placeOrder);
router.delete('/cart/remove-from-cart/:bookId', requireLogin, cartController.removeFromCart);

module.exports = router;
