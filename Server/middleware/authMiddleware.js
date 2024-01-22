// This middleware checks if the user is logged in
const session = require('express-session');

const requireLogin = (req, res, next) => {
    res.session = req.session;
    if (req.session.username) {
        console.log('User is logged in   ' + req.session.username);
        console.log('User is logged in   ' + req.session.role);
        return next();
    } else {
        return res.status(401).redirect('/login');
    }
};

const requireAdmin = (req, res, next) => {
    if (req.session.role === 'admin') {
        return next();
    } else {
        return res.status(403).send('Permission denied');
    }
};

module.exports = { requireLogin, requireAdmin };