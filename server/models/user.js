const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: String,
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  avatar: String,
  phone_number: String,
  address: {
    city: String,
    street_name: String,
    street_address: String,
    zip_code: String,
    state: String,
    country: String,
  },
});

module.exports = mongoose.model('User', userSchema);
