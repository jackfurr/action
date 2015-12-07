var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../app/models/user_model');

/*!
 * Route middlewares
 */
var auth = require('../middlewares/authorization');
var sessionAuth = [auth.requiresLogin, auth.session.hasAuthorization];



module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    UserModel.authenticate(email, password, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }

      return done(null, user);
    });
});
