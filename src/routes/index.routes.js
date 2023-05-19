const express = require('express');
const router = express.Router();
const { postCar, updateCar, deleteCar, getAvailableCars, makePayment } = require('../controller/car.controller');
const { ensureAuth, ensureGuest} = require('../middleware/auth')
const { isAuth, isAdmin } = require('../middleware/auth')



// Description: Login/Landing page
// Route: GET/
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// Description: Dashboard
// Route: GET/dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', {
        user: req.user
    });
})

// logout route
router.get('/logout', ensureAuth, (req, res) => {
    // destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        // redirect to the home page after logging out
        res.redirect('/');
      }
    });
  });
  


// Description: Add, update or delete a car (Admin only)
// Route: POST/PUT/DELETE /car
router.post('/car', isAuth, isAdmin, postCar);
router.put('/car/:id', isAuth, isAdmin, updateCar);
router.delete('/car/:id', isAuth, isAdmin, deleteCar);
router.get('/available-cars', getAvailableCars);
router.post('/payment', makePayment);

module.exports = router;
