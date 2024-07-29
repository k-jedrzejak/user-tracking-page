
import { Schema, model } from 'mongoose';

const accessLogSchema = new Schema({
  userId: { type: String, ref: 'User' },
  scrolledToImage: { type: Boolean, default: false }
});

export default model('AccessLog', accessLogSchema);
