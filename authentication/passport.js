const LocalStrategy = require('passport-local').Strategy
const STSchema = require('../database/Teacher-Student-Schems')


exports.initializingPassport = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await STSchema.findOne({email});

      if (!user) {
        return done(null, false, { message: 'Invalid credentials.' });
      }

    
      if (user.password !== password) {
        return done(null, false, { message: 'invalid credentials' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })); // closure of passport.use()

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await STSchema.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
};