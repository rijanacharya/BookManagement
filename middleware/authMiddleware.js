// This middleware checks if the user is logged in
const requireLogin = (req, res, next) => {
    if (req.session.username) {
        // If the user is logged in, proceed to the next middleware
        console.log('User is logged in');
        return next();
    } else {
        // If the user is not logged in, redirect them to the login page
        return res.redirect('/login');
    }
};

module.exports = { requireLogin };
