const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  idNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z0-9]{0,12}$/.test(v);
      },
      message: props =>
        `${props.value} is not a valid ID number. It should be alphanumeric and have a maximum length of 12 characters.`,
    },
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
