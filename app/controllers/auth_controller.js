var router = require('express').Router();

module.exports = function (app, passport) {
	app.use('/auth', router);

	router.post('/login',
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/auth/login',
			failureFlash: 'Invalid user name or password.'
		}), function(req, res) {
			// FixMe: What should I do here?
		}
	);

	router.get('/login', function(req, res) {
		res.render('login', {
			title: 'Login'
		});
	});

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};