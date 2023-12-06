// routes/routes.js
const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();

module.exports = function (upload) {
// Customer routes
router.get('/register', customerController.registerForm);
router.post('/register', customerController.register);
router.get('/login', customerController.loginForm);
router.post('/login', customerController.login);

return router;
};
