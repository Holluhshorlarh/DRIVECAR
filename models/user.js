const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  image: {
    type: String,
  },
  role: {
    type:String,
    enum: ["user", "admin"], 
    default: "user",
  },
}, {
  timestamps: true 
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
