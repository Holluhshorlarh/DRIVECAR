const express = require('express');
const passport = require('passport');
const router = express.Router();
require("dotenv").config();
require('../config/facebook');
// const { validateSignup, validateLogin } = require('../middleware/user.authentication');
// const { signUp, login } = require('../controller/email.signup');


// //User email signup
// router.post("/user/signup", signUp);
// router.post("/user/login", login);


// Description: Auth with Google
// route: GET auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Description: Google auth callback
// route: GET auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
}
)

// Description: Auth with Facebook
// route: GET auth/facebook
router.get('/facebook', passport.authenticate('facebook'));

// Description: Facebook auth callback
// route: GET auth/facebook/callback
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
}
)

module.exports = router;