const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

// Custom modules
const mongodb = require('../database/connection');  // Ensure your connection file is correct
const { initializingPassport } = require('../authentication/passport');  // Ensure passport config is correct

// Import routes
const authRoutes = require('../routes/authRoutes');
const teacherRoutes = require('../routes/teacherRoutes');
const studentRoutes = require('../routes/studentRoutes');

// Initialize Express App
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
  secret: 'secret name',  // Replace 'secret name' with a stronger secret for production
  resave: false,
  saveUninitialized: false,
}));

// Flash messages middleware
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport (Ensure the `passport.js` config file is correctly set up)
initializingPassport(passport);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Use the routes for authentication, teacher, and student
app.use(authRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);

// Error handling for unmatched routes
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
