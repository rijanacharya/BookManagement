// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/orderController');

// Define routes
router.post('/addtocart/:bookId', cartController.addToCart);
router.get('/cart', cartController.viewCart);
router.post('/place-order', cartController.placeOrder);

module.exports = router;
