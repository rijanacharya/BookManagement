// This middleware checks if the user is logged in
const session = require('express-session');

const requireLogin = (req, res, next) => {
    res.session = req.session;
    if (req.session.username) {
        // If the user is logged in, proceed to the next middleware

        console.log('User is logged in   ' + req.session.username);
        return next();
    } else {
        // If the user is not logged in, redirect them to the login page
        return res.redirect('/login');
    }
};

module.exports = { requireLogin };
