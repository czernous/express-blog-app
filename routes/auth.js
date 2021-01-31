const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();

const User = mongoose.model('User');
const { isLoggedIn, isAdmin } = require('../middleware');
const { genPassword, generateElement } = require('../utils');

router.get('/protected', isAdmin(), (req, res) => {
  res.status(200).json({ success: true, msg: 'You are authorized' });
});

router.get('/register', (req, res) => {
  const pageBody = generateElement(`register`);
  res.render('template', { pageBody });
});

router.post('/register', (req, res) => {
  const saltHash = genPassword(req.body.password);
  const { salt } = saltHash;
  const { hash } = saltHash;
  const newUser = new User({
    email: req.body.email,
    hash,
    salt,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: 'user',
  });
  newUser
    .save()
    .then((user) => {
      res.status(201).redirect('/auth/login');
    })
    .catch((err) => {
      let message;
      err.code === 11000 && err.keyValue.email
        ? (message = `User ${err.keyValue.email} already exists.`)
        : (message = err.message);
      req.flash('error', message);
      res.status(400).redirect('/auth/register');
    });
});
// todo
router.get('/login', isLoggedIn(), (req, res) => {
  const pageBody = generateElement(`login`);
  res.render('template', { pageBody });
});

router.post(
  '/login',
  (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(401).json({
        success: false,
        msg: 'You are already logged in.',
      });
    } else {
      next();
    }
  },
  passport.authenticate('local', {
    failureFlash: 'Email or password is incorrect.',
    failureRedirect: '/auth/login',
    successFlash: 'Welcome back!',
    successRedirect: '/',
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
