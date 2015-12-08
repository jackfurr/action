var router = require('express').Router();

module.exports = function (app, passport) {
	app.use('/', router);

	router.get('/', function(req, res) {
		var email = '';
		var log_in_out = {location:'/#login', text: 'Login'};

		// SET req.session.lastAccess = new Date().getTime(); When this is
		// loaded as well as all of the Backbone API cals
		if (req.session) {
			req.session.lastAccess = new Date().getTime();
		}

		if (req.user) {
			log_in_out = {location:'/logout', text: 'Logout'};
			email = req.user.email;
		}

		res.render('home/index', {
			title: 'Welcome',
			email: email,
			log_in_out: log_in_out
		});
	});

	router.post('/login',
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/#login',
			failureFlash: 'Invalid user name or password.'
		}), function(req, res) {
			// FixMe: What should I do here?
		}
	);

	// router.get('/login', function(req, res) {
	// 	res.render('login', {
	// 		title: 'Login'
	// 	});
	// });

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

};
