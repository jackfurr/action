var router = require('express').Router();
var UserModel = require('../models/user_model');

module.exports = function (app, passport) {
	app.use('/contact', router);

	// insert new action
	router.post('/', function (req, res, next) {

		// ActionModel.insert(email, password, function(err, result){
		// 	if (err) {
		// 		return res.status(500).send({ err:err });
		// 	}
		// 	return res.status(200).send({ user_id:result.insertId, email:email });
		// });

	});

	// update an existing record
	router.put('/:contact_id', function (req, res, next) {

		// ActionModel.insert(email, password, function(err, result){
		// 	if (err) {
		// 		return res.status(500).send({ err:err });
		// 	}
		// 	return res.status(200).send({ user_id:result.insertId, email:email });
		// });

	});

	// get a (single) existing record
	router.get('/:contact_id', function (req, res, next) {

		// ActionModel.insert(email, password, function(err, result){
		// 	if (err) {
		// 		return res.status(500).send({ err:err });
		// 	}
		// 	return res.status(200).send({ user_id:result.insertId, email:email });
		// });

	});

	// delete an action record
	router.delete('/:contact_id', function (req, res, next) {

		// ActionModel.insert(email, password, function(err, result){
		// 	if (err) {
		// 		return res.status(500).send({ err:err });
		// 	}
		// 	return res.status(200).send({ user_id:result.insertId, email:email });
		// });

	});

};
