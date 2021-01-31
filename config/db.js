const mongoose = require('mongoose');
require('../models/User');
require('dotenv').config();

let dbConnection;
process.env.NODE_ENV === 'production'
  ? (dbConnection = process.env.DB_STRING_PROD)
  : (dbConnection = process.env.DB_STRING);
mongoose.connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true,
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  useFindAndModify: false,
});
const { connection } = mongoose;
mongoose.connection.on('connected', () => {
  console.log('Database connected');
});

module.exports = connection;
