
/**
 * Module dependencies.
 */

var mongoose = require('../../shared_library/dbinit').mongoose;
var LinkedinStrategy = require('passport-linkedin').Strategy;
var config = require('../config');
var UserInfo = mongoose.model('UserInfo');

/**
 * Expose
 */

module.exports = new LinkedinStrategy({
    consumerKey: config.linkedin.clientID,
    consumerSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL,
    profileFields: ['id', 'first-name', 'last-name', 'email-address']
  },
  function(accessToken, refreshToken, profile, done) {
    var options = {
      criteria: { 'linkedin.id': profile.id }
    };
    UserInfo.load(options, function (err, userinfo) {
      if (err) return done(err);
      if (!userinfo) {
        userinfo = new UserInfo({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.emails[0].value,
          provider: 'linkedin',
          linkedin: profile._json
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
