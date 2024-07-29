import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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

export default model('User', userSchema);
