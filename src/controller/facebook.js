require("dotenv").config();
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Define the Facebook authentication strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.CALL_BACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  try {
    let user = await User.findOne({ facebookId: profile.id });
    if (user) {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log({ message: token });
      return done(null, user, token);
    }
    const newUser = new User({
      facebookId: profile.id,
      displayName: profile.displayName
    });
    user = await newUser.save();
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log({ message: token });
    done(null, user, token);
  } catch (error) {
    console.error(error);
    done(error, null);
  }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(error => done(error, null));
});

// Export the Facebook authentication strategy
module.exports = passport;
