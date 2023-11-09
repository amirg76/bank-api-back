import { Account } from "../models/user/account.model.js";
import { User } from "../models/user/user.model.js";
export const createAllAccounts = async () => {
  return await Account.createAllAccTogther();
};
export const deleteAccounts = async (productId) => {
  return await Account.removeAllAcc();
};
export const getAllAcc = async () => {
  return await Account.findAllAcc();
};
export const getAccById = async (accountNum) => {
  return await Account.findAccById(accountNum);
};
export const createNewAcc = async (account) => {
  const newAcc = new Account(account);

  return await newAcc.save();
};
export const deleteByAcc = async (accountNum) => {
  // await User.find({ account: { $in: [accountNum] } }).remove();
  await User.findOneAndUpdate(
    {
      account: { $in: [accountNum] },
    },
    { $pull: { account: accountNum } }
  );
  return await Account.deleteAccByNum(accountNum);
};
export const updateAccTable = async (account) => {
  return await Account.updateAccDetalis(account);
};
