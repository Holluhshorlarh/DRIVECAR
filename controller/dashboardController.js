const User = require('../models/user');

function dashboard(req, res) {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      // handle error
    } else {
      res.render('dashboard', { user: user });
    }
  });
}

module.exports = {
  dashboard
};
