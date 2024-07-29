const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config();

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    crypto: {
      secret: process.env.MONGO_STORE_SECRET
    }
  })
});

module.exports = sessionConfig;
