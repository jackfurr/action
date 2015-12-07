
/**
 * Module dependencies.
 */

var mongoose = require('../../shared_library/dbinit').mongoose;
var TwitterStrategy = require('passport-twitter').Strategy;
var config = require('../config');
var UserInfo = mongoose.model('UserInfo');

/**
 * Expose
 */

module.exports = new TwitterStrategy({
    consumerKey: config.twitter.clientID,
    consumerSecret: config.twitter.clientSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var options = {
      criteria: { 'twitter.id': profile.id }
    };
    UserInfo.load(options, function (err, userinfo) {
      if (err) return done(err);
      if (!userinfo) {
        userinfo = new UserInfo({
          name: profile.displayName,
          username: profile.username,
          provider: 'twitter',
          twitter: profile._json
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
