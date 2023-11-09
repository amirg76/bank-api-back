import { User } from "../models/user/user.model.js";
import { Account } from "../models/user/account.model.js";

export const getAllUsers = async () => {
  return await User.findAllUsers();
};
export const createAllUsers = async () => {
  return await User.createAllTogther();
};
export const deleteUsers = async (productId) => {
  return await User.removeAllUsers();
};
export const getUserById = async (personal_id) => {
  return await User.findUserById(personal_id);
};
export const createNewUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};
export const deleteById = async (req) => {
  await Account.find({ accountNum: { $in: req.account } }).remove();
  return await User.deleteUserById(req.personal_id);
};
export const updateUserTable = async (users) => {
  return await User.updateUserDetalis(users);
};
export const updateUserWithdrawal = async ({ userAccount, amount }) => {
  const checkUserAccount = await Account.findOne({
    accountNum: userAccount,
  });
  if (checkUserAccount) {
    await Account.decreaseUserAccount(userAccount, amount);
    await Account.pushToUserMovements(userAccount, amount);

    return "sucsses";
  } else {
    return "user";
  }
};

export const updateUserTransfer = async (transferObj) => {
  const { userAccount, accountToTransfer, transferAmount } = transferObj;
  const checkUserAccount = await Account.findOne({
    accountNum: userAccount,
  });
  const checkTransferAccount = await Account.findOne({
    accountNum: accountToTransfer,
  });

  if (checkUserAccount) {
    if (checkTransferAccount) {
      if (checkUserAccount.cash - transferAmount > -checkUserAccount.credit) {
        await Account.decreaseUserAccount(userAccount, transferAmount);
        await Account.increaseTransferAccount(
          accountToTransfer,
          transferAmount
        );
        await Account.pushToUserMovements(
          userAccount,
          transferAmount,
          accountToTransfer
        );
        await Account.pushToTransferMovements(
          userAccount,
          transferAmount,
          accountToTransfer
        );
        return "sucsses";
      } else {
        return "credit";
      }
    } else {
      return "transfer";
    }
  } else {
    return "user";
  }
};
export const getUserByAcc = async (accountNum) => {
  return await User.find({
    account: { $in: [accountNum] },
  });
};
export const loginChk = async (userReq) => {
  return await User.findByCredentials(userReq);
};
export const generateToken = async (user) => {
  return await user.generateAuthToken();
};
export const saveRemoveToken = async (token) => {
  return await token.save();
};
export const getPublicProfile = async (user) => {
  return await user.getPublicPro();
};
// (async () => {
//   const user = await User.findOne({});
//   console.log(user._id);
//   // User.findOne({});
//   user.remove();
// })();
