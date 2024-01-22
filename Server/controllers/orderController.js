// controllers/cartController.js
const Book = require('../models/book');
const Cart = require('../models/cart');
const path = require('path');

exports.addToCart = async (req, res) => {
    const bookId = req.params.bookId;

    try {
        // Find the selected book in the database
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Find or create the cart for the user
        let cart = await Cart.findOne({ userId: req.session.userId });

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = new Cart({ userId: req.session.userId, items: [] });
        }

        // Check if the book is already in the cart
        const existingCartItem = cart.items.find(item => item.bookId.toString() === bookId);

        if (existingCartItem) {
            // Increment the quantity if the book is already in the cart
            existingCartItem.quantity += 1;
        } else {
            // Add a new item to the cart if the book is not in the cart
            cart.items.push({ bookId, quantity: 1 });
        }

        // Save the cart to the database
        await cart.save();

        res.status(200).json({ message: 'Book added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.viewCart = async (req, res) => {
    try {
        // Fetch the user's cart from the database
        const cart = await Cart.findOne({ userId: req.session.userId });

        if (!cart) {
            return res.render('cart', { cart: [] });
        }

        // Fetch book details for each item in the cart
        const cartWithDetails = await Promise.all(cart.items.map(async (item) => {
            const book = await Book.findById(item.bookId);
            return { ...item.toObject(), book };  // Merge book details with existing cart item
        }));

        res.render('cart', { cart: cartWithDetails });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.placeOrder = async (req, res) => {
    try {
        // Fetch the user's cart from the database
        const cart = await Cart.findOne({ userId: req.session.userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).send('Cart is empty');
        }

        // Update order status, clear the shopping cart, and update book quantities
        for (const item of cart.items) {
            const book = await Book.findById(item.bookId);

            // Check if there's enough quantity to fulfill the order
            if (book.quantity < item.quantity) {
                return res.status(400).send(`Not enough quantity available for book: ${book.title}`);
            }

            // Update book quantity in the database
            await Book.updateOne({ _id: item.bookId }, { $inc: { quantity: -item.quantity } });
        }

        // Clear the cart in the database
        await Cart.updateOne({ userId: req.session.userId }, { $set: { items: [] } });

        res.sendFile(path.join(__dirname, '../views', 'order-success.html'));

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.removeFromCart = async (req, res) => {
    const bookId = req.params.bookId;

    try {
        // Find the user's cart from the database
        const cart = await Cart.findOne({ userId: req.session.userId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Find the index of the item in the cart
        const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);

        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Item not found in the cart' });
        }
        console.log('cart.items:', cart.items);

        // Remove the item from the cart
        if (cart.items[itemIndex].quantity > 1) {
            cart.items[itemIndex].quantity -= 1;
        } else {
            // If the quantity is 1 or less, remove the entire item from the cart
            cart.items.splice(itemIndex, 1);
        }
        // Save the updated cart to the database
        await cart.save();

        res.status(200).json({ message: 'Item removed from the cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
