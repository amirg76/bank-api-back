import uniqid from "uniqid";
import mongoose from "mongoose";
import { resolve } from "path";
import { accountSchema } from "./account.schema.js";
accountSchema.statics.removeAllAcc = function () {
  return this.deleteMany();
};
accountSchema.statics.findAllAcc = function () {
  return this.find({});
};
accountSchema.statics.findAccById = function (accnum) {
  return this.findOne({ accountNum: accnum });
};
accountSchema.statics.deleteAccByNum = function (accnum) {
  return this.findOneAndDelete({ accountNum: accnum });
};
accountSchema.statics.updateAccDetalis = function (account) {
  return this.findOneAndUpdate(
    { _id: account._id },
    { $set: { ...account } },
    { new: true }
  );
};
accountSchema.statics.decreaseUserAccount = function (
  userAccount,
  transferAmount
) {
  return this.findOneAndUpdate(
    { accountNum: userAccount },
    { $inc: { cash: -transferAmount } }
  );
};
accountSchema.statics.pushToUserMovements = function (
  userAccount,
  transferAmount,
  accountToTransfer = 9999
) {
  let typeOfAction = "משיכה";
  if (accountToTransfer !== 9999) typeOfAction = "העברה";
  const movementObj = {
    action: typeOfAction,
    amount: transferAmount,
    transfer_acc: accountToTransfer,
    tracking_Id: uniqid.time(),
  };

  return this.findOneAndUpdate(
    { accountNum: userAccount },
    {
      $push: {
        tracking_Mov: movementObj,
      },
    }
  );
};

accountSchema.statics.pushToTransferMovements = function (
  userAccount,
  transferAmount,
  accountToTransfer
) {
  const movementObj = {
    action: "התקבל",
    amount: transferAmount,
    transfer_acc: userAccount,
    tracking_Id: uniqid.time(),
  };

  return this.findOneAndUpdate(
    { accountNum: accountToTransfer },
    {
      $push: {
        tracking_Mov: movementObj,
      },
    }
  );
};

// tracking_Mov: [
//   {
//     tracking_Id: { type: Number },
//     action: { type: String },
//     amount: { type: Number },
//     date: { type: Date, default: new Date() },
//     transfer_acc: { type: Number },
//     status: { type: String },
//   },

accountSchema.statics.increaseTransferAccount = function (
  accountToTransfer,
  transferAmount
) {
  return this.findOneAndUpdate(
    { accountNum: accountToTransfer },
    { $inc: { cash: transferAmount } }
  );
};

accountSchema.statics.createAllAccTogther = function () {
  const accounts = [
    {
      id: 1,
      accountNum: 1003,
      cash: 0,
      credit: 0,
      minusInterest: 1.1,
    },
    {
      id: 2,
      accountNum: 10202,
      cash: 0,
      credit: 0,
      minusInterest: 1.4,
    },
    {
      id: 3,
      accountNum: 5713,
      cash: 0,
      credit: 0,
      minusInterest: 1.3,
    },
    {
      id: 4,
      accountNum: 9966,
      cash: 0,
      credit: 0,
      minusInterest: 1.2,
    },
    {
      id: 5,
      accountNum: 1002,
      cash: 0,
      credit: 0,
      minusInterest: 1.3,
    },
    {
      id: 6,
      accountNum: 1056,
      cash: 0,
      credit: 0,
      minusInterest: 1.3,
    },
    {
      id: 7,
      accountNum: 5241,
      cash: 0,
      credit: 0,
      minusInterest: 1.3,
      tracking_Mov: [
        {
          tracking_Id: 2222,
          action: "משיכה",
          amount: 500,
          transfer_acc: 9999,
          status: "מינוס",
        },
      ],
    },
    {
      id: 8,
      accountNum: 5968,
      cash: 0,
      credit: 0,
      minusInterest: 1.1,
      tracking_Mov: [
        {
          tracking_Id: 1111,
          action: "העברה",
          amount: 50,
          transfer_acc: 5241,
          status: "פלוס",
        },
      ],
    },
  ];

  return this.create(accounts);
};

const Account = mongoose.model("accounts", accountSchema);

export { Account };
