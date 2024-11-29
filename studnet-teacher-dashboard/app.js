const express = require("express");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const path = require("path");

// Custom modules
const mongodb = require("./database/connection");
const { initializingPassport } = require("./authentication/passport");
const authentication = require("./middleware/authentication");

// Import routes
const authRoutes = require("./routes/authRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Initialize Express App
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret name",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
initializingPassport(passport);

// Set the view engine
app.set("view engine", "ejs");

// Routes
app.use(authRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);
