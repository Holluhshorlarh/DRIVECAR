const express = require('express');
const router = express.Router();
const { userSignup, userLogin, softDeleteUser } = require('../controllers/user.controllers');
const { authMiddleware }= require('../middlewares/authMiddlewares');

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.patch('/users/:userId/delete', authMiddleware, softDeleteUser);

module.exports = router;
