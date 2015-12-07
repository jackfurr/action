
/**
 * Module dependencies.
 */

var mongoose = require('../../shared_library/dbinit').mongoose;
var GithubStrategy = require('passport-github').Strategy;
var config = require('../config');
var UserInfo = mongoose.model('UserInfo');

/**
 * Expose
 */

module.exports = new GithubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var options = {
      criteria: { 'github.id': profile.id }
    };
    UserInfo.load(options, function (err, userinfo) {
      if (err) return done(err);
      if (!userinfo) {
        userinfo = new UserInfo({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          provider: 'github',
          github: profile._json
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
