var assert = require('assert');
var config = require('../../config/config');
var db = require('../../db');
var UserModel = require('../models/user_model');
var uuid = require('node-uuid');

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
	if (err) {
		console.log('Unable to connect to MySQL.');
	}
});

describe('User Model', function() {

	describe('User.insert()', function() {
		it('Insert a new user record', function(done) {
			var email = uuid.v4().toString() + '@gmail.com';
			var passwordHash = 'password';
			UserModel.insert(email, passwordHash, function(err, result){
				assert.equal(null, err);
				done();
			});
		});
	});

	describe('User.insert()', function() {
		it('Insert a new user record', function(done) {
			var email = uuid.v4().toString() + '@gmail.com';
			var passwordHash = 'password';
			UserModel.insert(email, passwordHash, function(err, result){
				assert.equal(null, err);
				done();
			});
		});
	});

});
