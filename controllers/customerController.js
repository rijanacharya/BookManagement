const express = require('express');
const bcrypt = require('bcrypt');
const Customer = require('../models/customer');
const fs = require('fs').promises;

// Render the registration form
exports.registerForm = (req, res) => {
  res.sendFile('registerForm.html', { root: './views' });
};

// Render the login form
exports.loginForm = (req, res) => {
  res.sendFile('loginForm.html', { root: './views' });
};

// Handle customer registration
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Assuming 'customer' is the hardcoded role for customer accounts
    const role = 'customer';

    const customer = await Customer.create({ username, password, email });
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error in register endpoint:', error);
    res.status(500).json({ error: error.message });
  }
};

// Handle customer login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Attempting login for user:', username);
    console.log('Input password:', password);
    const customer = await Customer.findOne({ username: username.toLowerCase() });
    console.log('Retrieved customer:', customer);
    if (!customer) {

      return res.status(401).json({ message: 'Invalid username or password' });
    }
    console.log('Retrieved hashed password:', customer.password);
    const isValidPassword = password === customer.password;

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Store the user's role in the session
    // req.session.role = customer.role;
    req.session.username = username;
    req.session.userId = customer._id.toString();
    req.session.role = customer.role;


    if (customer.role === 'admin') {
      res.redirect('/admin/books');
      // res.status(200).json({ message: 'Admin login successful' });
    } else if (customer.role === 'customer') {
      res.redirect('/books');
      // res.status(200).json({ message: 'Customer login successful' });
    } else {
      res.status(401).json({ message: 'Invalid role' });
    }
  } catch (error) {
    console.error('Error in login endpoint:', error);
    res.status(500).json({ error: error.message });
  }
};

// Handle customer logout
exports.logout = (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy((err) => {
    if (err) {
      console.error('Error in logout endpoint:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // Redirect the user to the login page after logout
    res.redirect('/login');
  });
};
