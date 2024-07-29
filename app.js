import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { connect } from 'mongoose';
import { fileURLToPath } from 'url';
import User from './models/user.js';
import AccessLog from './models/accessLog.js';
import session from 'express-session';
import fetchUserData from './utils/fetchUserData.js';
import MongoStore from 'connect-mongo';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || 3000
const URI = process.env.MONGODB_URI;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: URI })
  })
);

app.use(async (req, res, next) => {
  if (!req.session.userId) {
    const userData = await fetchUserData();
    if (userData) {
      const newUser = new User(userData);
      await newUser.save(); 
      req.session.userId = newUser._id; 
      const newAccessLog = new AccessLog({ userId: newUser._id });
      await newAccessLog.save(); 
    }
  }
  next(); 
});





app.get("/", async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render("index", { user });
});

// connect to MongoDB and run the server
connect(URI)
.then(() => {
  console.log("MongoDB connection successful.", URI);
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
  });
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});


