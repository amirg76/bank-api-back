import mongoose from "mongoose";
import validator from "validator";

const accountSchema = new mongoose.Schema({
  id: { type: Number },
  accountNum: { type: Number, require: true, unique: true },
  cash: { type: Number, default: 0, require: true },
  credit: { type: Number, default: 0, require: true },
  minusInterest: { type: Number, require: true },
  tracking_Mov: [
    {
      tracking_Id: { type: String },
      action: { type: String },
      amount: { type: Number },
      date: { type: Date, default: new Date() },
      transfer_acc: { type: Number },
      status: { type: String },
    },
  ],
});

export { accountSchema };
