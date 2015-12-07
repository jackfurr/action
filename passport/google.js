
/**
 * Module dependencies.
 */

var mongoose = require('../../shared_library/dbinit').mongoose;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var UserInfo = mongoose.model('UserInfo');

/**
 * Expose
 */

module.exports = new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var options = {
      criteria: { 'google.id': profile.id }
    };
    UserInfo.load(options, function (err, userinfo) {
      if (err) return done(err);
      if (!userinfo) {
        userinfo = new UserInfo({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          provider: 'google',
          google: profile._json
        });
        userinfo.save(function (err) {
          if (err) console.log(err);
          return done(err, userinfo);
        });
      } else {
        return done(err, userinfo);
      }
    });
  }
);
