const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  scrolledToImage: { type: Boolean, default: false },
  firstName: { type: String, required: true  }, 
  lastName: { type: String, required: true  },
});

module.exports = mongoose.model('AccessLog', accessLogSchema);
