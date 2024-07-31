const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.MONGODB_URI || "mongodb://mongo:27017/userTrackingDB"

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    throw err;
  }
};

module.exports = { connectDB };
