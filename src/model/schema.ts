import { Schema, model } from 'mongoose';

interface User {
  fname: string;
  lname: string;
  email: string;
  phone: number;
  password: string;
  gender: string,
  imageUrl: string;

}

const schema = new Schema<User>({
  fname: {
    type: String,
    required: true
  },
  lname:
  {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female"]
  },
  imageUrl: { type: String, },
}, { timestamps: true });


export default model<User>('User', schema)