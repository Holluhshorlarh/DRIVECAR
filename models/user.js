const validateIdNumber = (value) => {
    const idNumberRegex = /^[0-9]{12}$/;
    return idNumberRegex.test(value);
  };
  
  const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    idNumber: {type: String,enum: ['International Passport', 'Drivers license', 'Voters card'], 
    required: true, validate: [validateIdNumber, "Invalid ID number"]},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('User', userSchema);