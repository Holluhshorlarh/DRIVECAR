const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv").config();

exports.userSignUp = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return a success message if the user was saved successfully
    return res.status(201).json({
      status: "Success",
      message: `${newUser.firstName} account created successfully`,
      userId: newUser.id,
      email: newUser.email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Failed", message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist, please sign up" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const tokenData = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: 600,  //seconds
    });

    res.cookie("access-token", token);
    return res.status(200).json({
      status: "Success",
      message: `${user.firstName} logged in successfully`,
      userId: user.id,
      userEmail: user.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("access-token");
    return res.status(200).json({
      status: "Success",
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};
