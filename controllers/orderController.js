const Order = require('../models/order');
const Customer = require('../models/customer');
const Book = require('../models/book');

async function displayAllOrders(req, res) {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Render a view with all orders
    res.render('allOrders', { orders });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Controller method to display detailed information for a specific order
async function displayOrderDetail(req, res) {
  try {
    // Extract the order ID from the request parameters
    const orderId = req.params.id;

    // Fetch the order with the specified ID from the database
    const order = await Order.findById(orderId).populate('customer').populate('book');

    // Render a view with the detailed information for the specific order
    res.render('orderDetail', { order });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Controller method to place an order
async function placeOrder(req, res) {
    try {
      const { customerId, bookId, quantity } = req.body;
  
      // Check if the customer and book exist
      const customer = await Customer.findById(customerId);
      const book = await Book.findById(bookId);
  
      if (!customer || !book) {
        return res.status(404).json({ error: 'Customer or book not found' });
      }
  
      // Create a new order
      const newOrder = new Order({
        customer: customer._id, // Use customer._id instead of customerId
        books: [book._id], // Use book._id and store it in an array
        quantity,
        status: 'Processing',
      });
  
      // Save the new order to the database
      await newOrder.save();
  
      res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

async function trackOrder(req, res) {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(200).json({ status: order.status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  

module.exports = {
  displayAllOrders,
  displayOrderDetail,
  placeOrder,
  trackOrder,
  
};
