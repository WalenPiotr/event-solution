import * as mongoose from 'mongoose';

export const EntrySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: Date,
});
