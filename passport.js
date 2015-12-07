var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('./app/models/user_model');

var local = require('./passport/local');
// var google = require('./passport/google');
// var facebook = require('./passport/facebook');
// var twitter = require('./passport/twitter');
// var linkedin = require('./passport/linkedin');
// var github = require('./passport/github');

/**
 * Expose
 */

 /*!
 * Route middlewares
 */
var auth = require('./middlewares/authorization');
var sessionAuth = [auth.requiresLogin, auth.session.hasAuthorization];



module.exports = function (passport, config) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.user_id);
  });

  passport.deserializeUser(function(userId, done) {
    UserModel.getByUserId(userId, function (err, user) {
      done(err, user);
    });
  });

  // use these strategies
  passport.use(local);
  // passport.use(google);
  // passport.use(facebook);
  // passport.use(twitter);
  // passport.use(linkedin);
  // passport.use(github);
};
