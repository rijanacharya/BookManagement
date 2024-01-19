const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();
const { requireLogin } = require('../middleware/authMiddleware'); // Import the authentication middleware

module.exports = function (upload) {
    // Customer routes
    router.get('/register', customerController.registerForm);
    router.post('/register', customerController.register);
    router.get('/login', customerController.loginForm);
    router.post('/login', customerController.login);
    router.get('/logout', requireLogin, customerController.logout);
    return router;
};
