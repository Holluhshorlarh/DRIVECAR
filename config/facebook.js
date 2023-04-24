const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (passport) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'emails', 'photos']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });
      if (user) {
        return done(null, user);
      }
      const newUser = new User({
        facebookId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: profile.photos[0].value
      });
      user = await newUser.save();
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error, null);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(error => done(error, null));
  });
};
