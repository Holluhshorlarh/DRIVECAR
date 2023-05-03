// middleware/messagesMiddleware.js
module.exports = function(req, res, next) {
    console.log('A new request has been received.');
    next();
  };
  