require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserServices = require('../services/user.services')
const User = require('../models/user')
const { comparePassword, hashedPassword } = require('../helper/compare.password');

exports.signUp = async (req, res) => {
  let { firstName, lastName, email, password, gender, age } = req.body
  try {
    const userExist = await UserServices.findByEmail(email);
    if (userExist) {
      return res.status(400).json({ message: 'User already exist' })
    }
    password = await hashedPassword(password);
    let payload = { firstName, lastName, email, password, gender, age }
    const user = await UserServices.createUser(payload);
    return res.status(201).json({
      status: "Success",
      message: `${user.firstName} account created successfully`,
      "user Id": user.id,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserServices.findByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist, please sign up" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const tokenData = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: '60',
    });

    res.cookie("access-token", token);
    return res.status(200).json({
      status: "Success",
      message: `${user.firstName} logged in successfully`,
      "user id": user.id,
      "user email": user.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};

