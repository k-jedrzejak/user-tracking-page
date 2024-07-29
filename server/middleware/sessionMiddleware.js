const User = require('../models/user');
const fetchUserData = require('../utils/fetchUserData');

const sessionMiddleware = async (req, res, next) => {
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
};

module.exports = sessionMiddleware;
