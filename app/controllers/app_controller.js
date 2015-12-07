var router = require('express').Router();
var UserModel = require('../models/user_model');

module.exports = function (app, passport) {
	app.use('/app', router);

	router.post('/user', function (req, res, next) {
		var email = req.body.email || req.params.email || null;
		var password = req.body.password || req.params.password || null;

		UserModel.insert(email, password, function(err, result){
			if (err) {
				return res.status(500).send({ err:err });
			}
			return res.status(200).send({ user_id:result.insertId, email:email });
		});

	});

	router.post('/project', function (req, res, next) {
		var email = req.body.email || req.params.email || null;
		var password = req.body.password || req.params.password || null;

		UserModel.insert(email, password, function(err, result){
			if (err) {
				return res.status(500).send({ err:err });
			}
			return res.status(200).send({ user_id:result.insertId, email:email });
		});

	});
};
