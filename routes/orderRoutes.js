const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// router.get('/', orderController.displayAllOrders);

// router.get('/:id', orderController.displayOrderDetail);

// router.post('/', orderController.placeOrder);

// router.get('/track', (req, res) => {
//   res.render('orderTracking'); // Render the orderTracking view
// });

// router.get('/:id/track', orderController.trackOrder);

router.get('/:orderId', orderController.displayOrderDetail);


module.exports = router;