import mongoose, { Schema } from 'mongoose';

const robotSchema = new Schema({
  _id: String,
  name: String,
  img: String,
  characteristics: {
    velocity: Number,
    resistence: Number,
    creation: Date,
  },
});

export const RobotModel = mongoose.model('Robot', robotSchema, 'robots');
