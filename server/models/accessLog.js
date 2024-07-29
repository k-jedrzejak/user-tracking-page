
const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' },
  scrolledToImage: { type: Boolean, default: false }
});

module.exports = mongoose.model('AccessLog', accessLogSchema);
