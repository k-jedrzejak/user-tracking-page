const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: String,
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  avatar: String,
});

module.exports = mongoose.model('User', userSchema);
