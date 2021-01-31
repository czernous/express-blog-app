const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');
const { validatePassword } = require('../utils');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};
const verifyCallback = (username, password, done) => {
  User.findOne({ email: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = validatePassword(password, user.hash, user.salt);
      if (isValid) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => {
      done(err);
    });
};
const strategy = new LocalStrategy(customFields, verifyCallback);
// TODO
passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
