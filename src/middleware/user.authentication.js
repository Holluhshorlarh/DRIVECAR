exports.validateSignup = (req, res, next) => {
  const { firstName, lastName, email, password, gender, age } = req.body;

  switch (true) {
    case !firstName:
      return res.status(400).json({ message: "First name is required" });
    case !lastName:
      return res.status(400).json({ message: "Last name is required" });
    case !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      return res.status(400).json({ message: "Enter a valid email address" });
    case !gender:
      return res.status(400).json({ message: "Gender is required" });
    case !age:
      return res.status(400).json({ message: "Age is required. Please provide your age to proceed with registration." });
    case age < 18:
      return res.status(400).json({ message: "You have to be 18 and above to proceed with registration." });
    case !password:
      return res.status(400).json({ message: "Password is required" });
    case password.length < 8:
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    // case !/(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/.test(password):
    //   return res.status(400).json({ message: "Password must contain at least one uppercase letter and one special character" });
    default:
      next();
  }
};



exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Enter a valid email address" });
  } else if (!password || password.length < 5) {
    return res
      .status(400)
      .json({ message: "password must be greater 5 characters" });
  } else {
    next();
  }
};
