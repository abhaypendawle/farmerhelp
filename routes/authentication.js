
var express = require('express');
var router = express.Router();
var passport = require("passport");

/**
 * returns the login page
 */
router.get('/login', function (req, res) {
	res.render('./index', {title: "Login"});
});

/**
 * Authenticates the user with given username and password
 */
router.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).send({
				success: false,
				error: "User not found!",
				data: null
			});
		}

		req.logIn(user, {session: false}, function (err) {
			if (err) {
				return next(err);
			}
			delete user.password;
			req.user = user;
			req.session.user = user;
			return res.send({
				success: true,
				error: null,
				data: user
			});
		});
	})(req, res, next);
});

/**
 * logouts the user from system.
 */
router.get('/logout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

/**
 * function that checks if the user is logged in or not.
 * If not logged in, the user is redirected to login page.
 * @param req
 * @param res
 * @param next
 */
router.requireLogin = function (req, res, next) {
	if (!req.session.user) {
	 	res.status(403).send();
	 } else {
	 	next();
	 }
};

module.exports = router;