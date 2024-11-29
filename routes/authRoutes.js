const express = require('express');
const passport = require('passport');
const STSchema = require('../database/Teacher-Student-Schems');

const router = express.Router();

// Registration route
router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/registration', async (req, res) => {
  try {
    const { username, email, password, profession } = req.body;

    // Validate required fields
    if (!username || !email || !password || !profession) {
      return res.status(400).send('All fields are required!');
    }

    // Check if the user already exists
    let existingUser = await STSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Save new user
    const user = new STSchema({ username, email, password, profession });
    await user.save();
    console.log('User created successfully');
    res.redirect('/login');
  } catch (error) {
    console.error('Error occurred during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
router.get('/login', (req, res) => {
  res.render('loginpage', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/redirectUser',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Redirect route
router.get('/redirectUser', (req, res) => {
  if (!req.user || !req.user.profession) {
    req.flash('error', 'Unauthorized access');
    return res.redirect('/login');
  }

  const profession = req.user.profession;
  if (profession === 'Student') {
    res.redirect('/enter-marks');
  } else if (profession === 'Teacher') {
    res.redirect('/teacher-dashboard');
  } else {
    req.flash('error', 'Invalid profession type');
    res.redirect('/login');
  }
});

module.exports = router;
