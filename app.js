require('dotenv').config();
const express = require('express')
const path = require('path')
const mongoose = require('mongoose');

const app = express()
const PORT = process.env.PORT || 3000
const URI = process.env.MONGODB_URI;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

try {
  mongoose.connect(URI);
  console.log("MongoDB connection successful.", URI);
} catch (err) {
  console.error("Failed to connect to MongoDB:", err);
}

app.get('/', (req, res) => {
  res.render("index");
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
