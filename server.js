require('pmx').init({
  http : true
});

var express = require('express');
var config = require('./config/config');
var db = require('./db');
var passport = require('passport');

var app = express();
require('./config/express')(app, passport, config);

// Bootstrap passport config
require('./passport')(passport, config);

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
	if (err) {
		console.log('Unable to connect to MySQL.');
		process.exit(1);
	} else {
		app.listen(config.port, function () {
			console.log('Express server listening on port ' + config.port);
		});
	}
});