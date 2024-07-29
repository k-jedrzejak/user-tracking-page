const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const { connect } = require('mongoose');
const User = require('./models/user');
const AccessLog = require('./models/accessLog');
const session = require('express-session');
const fetchUserData = require('./utils/fetchUserData');
const MongoStore = require('connect-mongo');

dotenv.config();

console.log(process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

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
    try {
      const userData = await fetchUserData();
      if (userData) {
        const user = await User.create(userData);
        req.session.userId = user._id;
        console.log('User created and logged in session:', user);
      } else {
        console.log('Failed to fetch user data.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  } else {
    console.log('User already in session:', req.session.userId);
  }
  next();
});


app.get("/api/users", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/scroll-event", async (req, res) => {
  const { userId, firstName, lastName } = req.body;
  if (!userId || !firstName || !lastName) {
    return res.status(400).json({ message: 'UserId, firstName, and lastName are required' });
  }

  try {
    let accessLog = await AccessLog.findOne({ userId });

    if (!accessLog) {
      const newAccessLog = new AccessLog({
        userId,
        scrolledToImage: true,
        firstName,
        lastName
      });
      await newAccessLog.save();
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling scroll event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get("/api/report", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const scrolledUsers = await AccessLog.countDocuments({ scrolledToImage: true });

    let scrollPercentage = 0;
    if (totalUsers > 0) {
      scrollPercentage = (scrolledUsers / totalUsers) * 100;
    }

    res.json({ totalUsers, scrollPercentage });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Serve Vue.js static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route to serve the Vue.js app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Connect to MongoDB and run the server
connect(URI)
  .then(() => {
    console.log("MongoDB connection successful.", URI);
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
