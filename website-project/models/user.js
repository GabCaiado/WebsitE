import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String
  },
  lastname: {
    type: String
  },
  phone: {
    type: String
  },
  avatar: {
    type: String, 
    default: ''
  },
  googleId: {
    type: String
  },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);

export default User;