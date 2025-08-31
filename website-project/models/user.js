import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String },
  password: { type: String },
  name: { type: String },
  lastname: { type: String },
  phone: { type: String },
  avatar: { type: String, default: '' },
  googleId: { type: String },
  stripeCustomerId: { type: String },
  purchases: [
    {
      stripePaymentId: { type: String },
      amount: { type: Number },
      currency: { type: String },
      status: { type: String },
      createdAt: { type: Date, default: Date.now },
      products: [
        {
          name: { type: String },
          image: { type: String },
          price: { type: Number },
          quantity: { type: Number },
        },
      ],
    },
  ],
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;
