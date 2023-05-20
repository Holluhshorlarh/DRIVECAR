require('dotenv').config();
const jwt = require('jsonwebtoken');

 const jwtService = {
    generateToken: (payload) => {
      // payload as parameter
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      return token;
    },
    verifyToken: (token) => {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      return payload;
    },
    // extract res.cookie
    extractToken: (req) => {
      const token = req.cookies.token;
      return token;
    },
    setTokenCookie: (res, token) => {
    res.cookie("token", token, { httpOnly: true });
  }
  
    
  };
  
  
  
  module.exports = jwtService;
  