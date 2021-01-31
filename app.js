const compression = require('compression');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const sanitizer = require('express-sanitizer');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo')(session);
const connection = require('./config/db');

require('dotenv').config();

const app = express();

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  autoRemove: 'disabled',
  collection: 'session',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(sanitizer());
app.use(
  compression({
    filter: shouldCompress,
    level: 7,
  })
);

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use(require('./routes'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/tinymce',
  express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);

const PORT = process.env.PORT || 5000;

// -------------------------------

app.listen(PORT, () => {
  console.log(
    `app is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
