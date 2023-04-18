const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userService = require('../services/userService');
require('dotenv').config();

const { JWT_SECRET } = process.env;

exports.userSignup = async (req, res) => {
  try {
    const { error } = userService.signUpValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user with given email already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: 'User with email already exists' });
    }

    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user object and save to database
    const { firstName, lastName, age, email } = req.body;
    const user = new User({
      firstName,
      lastName,
      age,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Create JWT token for the user
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    return res.status(201).json({ token, message: `${firstName} account created successfully!` });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { error } = userService.loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user with given email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token for the user
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Soft delete user by setting isActive property to false
exports.softDeleteUser = async (req, res) => {
  try {
    // Check if authenticated user is admin
    if (!req.user.isAdmin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if user with given id exists
    const userToDelete = await User.findById(req.params.userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Soft delete user by setting isActive property to false
    userToDelete.isActive = false;
    await userToDelete.save();

    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
