var router = require('express').Router();
var UserModel = require('../models/user_model');

module.exports = function (app, passport) {
	app.use('/user', router);

	// insert new user
	router.post('/', function (req, res, next) {

		// ActionModel.insert(email, password, function(err, result){
		// 	if (err) {
		// 		return res.status(500).send({ err:err });
		// 	}
		// 	return res.status(200).send({ user_id:result.insertId, email:email });
		// });

	});

	// update an existing record
	router.put('/:user_id', function (req, res, next) {

		// ActionModel.insert(email, password, function(err, result){
		// 	if (err) {
		// 		return res.status(500).send({ err:err });
		// 	}
		// 	return res.status(200).send({ user_id:result.insertId, email:email });
		// });

	});

	// get a (single) existing record
	router.get('/:user_id', function (req, res, next) {

		// ActionModel.insert(email, password, function(err, result){
		// 	if (err) {
		// 		return res.status(500).send({ err:err });
		// 	}
		// 	return res.status(200).send({ user_id:result.insertId, email:email });
		// });

	});

	// delete an user record
	router.delete('/:user_id', function (req, res, next) {

		// ActionModel.insert(email, password, function(err, result){
		// 	if (err) {
		// 		return res.status(500).send({ err:err });
		// 	}
		// 	return res.status(200).send({ user_id:result.insertId, email:email });
		// });

	});

};
