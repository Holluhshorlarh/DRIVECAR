const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureAuth, ensureGuest} = require('../middleware/auth');
const FacebookStrategy = require('passport-facebook').Strategy;
require("dotenv").config()

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Here you can handle the user profile data and create or update a user in your database
    done(null, profile);
  }
));

// Description: Auth with Google
// route: GET auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile'] }));

// Description: Google auth callback
// route: GET auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/dashboard');
});

// Description: Auth with Facebook
// route: GET auth/facebook
router.get('/facebook', passport.authenticate('facebook'));

// Description: Facebook auth callback
// route: GET auth/facebook/callback
router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/dashboard');
});

// Description: Logout User
// route: /auth/logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
