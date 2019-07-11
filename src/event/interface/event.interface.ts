import { Document } from 'mongoose';

export interface Event extends Document {
  readonly firstName: String;
  readonly lastName: String;
  readonly email: String;
  readonly date: Date;
}
