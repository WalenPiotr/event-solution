import * as mongoose from 'mongoose';

export const EntrySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  date: Date,
});
