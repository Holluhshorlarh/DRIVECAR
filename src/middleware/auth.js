const jwt = require("jsonwebtoken");

exports.ensureAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

exports.ensureGuest = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    return next();
  }
};

exports.isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Unauthorize" });
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) return res.status(401).json({ message: "Unauthorize" });
    req.user = decode;
    next();
  } catch (error) {
    console.error(error);
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role === "admin") next();
    else
      return res
        .status(403)
        .json({ message: "Unauthorize, you are not an admin" });
  } catch (error) {
    console.error(error);
  }
};
