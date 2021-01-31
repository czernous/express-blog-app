const express = require('express');
const flash = require('connect-flash');
const blogRoutes = require('./blog');
const authRoutes = require('./auth');
const { generateElement } = require('../utils');

const router = express.Router({ mergeParams: true });
router.use(flash());
router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.info = req.flash('info');
  next();
});

router.use('/blog', blogRoutes);
router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  // res.redirect('/blog?page=1&limit=5');
  const pageBody = generateElement('landing');
  res.render('template', { pageBody });
});

module.exports = router;
