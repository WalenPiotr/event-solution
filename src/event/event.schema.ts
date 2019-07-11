import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: Date,
});

// const Event = mongoose.model('Event', EventSchema);
