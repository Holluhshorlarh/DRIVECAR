const express = require('express');
const router = express.Router();
const { postCar, updateCar, deleteCar } = require('../controller/car.controller');
const { ensureAuth, ensureGuest} = require('../middleware/auth')
const { isAuth, isAdmin } = require('../middleware/auth')
// Description: Login/Landing page
//Route: GET/
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// Description: Dashboard
//Route: GET/dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard')
})

// Description: Add, update or delete a car (Admin only)
//Route: POST/PUT/DELETE /car
router.post('/car', isAdmin, postCar);
router.put('/car/:id', isAdmin, updateCar);
router.delete('/car/:id', isAdmin, deleteCar);


module.exports = router