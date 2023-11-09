import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  // id: { type: Number },
  personal_id: { type: Number, require: true, unique: true },
  password: { type: String, require: true },
  f_name: { type: String, require: true },
  l_name: { type: String, require: true },
  phone: { type: Number, requrie: true },
  address: { type: String, require: true },
  city: { type: String, require: true },
  cash: { type: Number, default: 0, require: true },
  credit: { type: Number, default: 0, require: true },
  account: [{ type: Number, require: true }],
  status: { type: Boolean, default: false },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email in invalid");
      }
    },
  },
  
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// { "id": 1238, "cash": 0, "credit": 0, "account": [5713, 9966] }

export { userSchema };
