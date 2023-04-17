const validateIdNumber = (value) => {
    const idNumberRegex = /^[0-9]{12}$/;
    return idNumberRegex.test(value);
  };
  
  const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        default: null,
      },
      lastName: {
        type: String,
        required: true,
      },
      idType: {
        type: String,
        enum: ["international passport", "drivers license", "voters card"],
        required: true,
      },
      idNumber: {
        type: String,
        required: true,
        validate: [validateIdNumber, "Invalid ID number"],
      },
    },
    {
      timestamps: true,
    }
  );
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;  