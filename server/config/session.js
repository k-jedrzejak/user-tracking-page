const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");

dotenv.config();

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || "secret-key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || "mongodb://mongo:27017/userTrackingDB",
    crypto: {
      secret: process.env.MONGO_STORE_SECRET,
    },
    ttl: 24 * 60 * 60, // 24h
    autoRemove: "native",
  }),
  cookie: {
    httpOnly: true,  
    secure: false, // false only for development
    maxAge: 24 * 60 * 60 * 1000, 
    sameSite: 'lax' // 24h
  }
});

module.exports = sessionConfig;
