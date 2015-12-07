var mysql = require('mysql'),
    async = require('async'),
    config = require('./config/config');

exports.MODE_PRODUCTION = 'production';

var state = {
  pool: null,
  mode: null,
};

exports.connect = function(mode, done) {
    state.pool = mysql.createPoolCluster();

    state.pool.add('READ', config.db.read);
    state.pool.add('WRITE', config.db.write);

  state.mode = mode;
  done();
};

exports.READ = 'read';
exports.WRITE = 'write';

exports.get = function(type, done) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  if (type === exports.WRITE) {
    state.pool.getConnection('WRITE', function (err, connection) {
      if (err) return done(err);
      done(null, connection);
    });
  } else {
    state.pool.getConnection('READ', function (err, connection) {
      if (err) return done(err);
      done(null, connection);
    });
  }
};
