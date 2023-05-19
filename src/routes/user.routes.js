const express = require('express');
const { validateSignup, validateLogin } = require('../middleware/user.authentication');

const { signUp, login } = require('../controller/email.signup');
const router = express.Router();

router.post("/user/signup", validateSignup, signUp);

router.post("/user/login", validateLogin, login);

module.exports = router;
