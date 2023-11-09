import {
  getAllUsers,
  createAllUsers,
  getUserById,
  deleteUsers,
  createNewUser,
  deleteById,
  updateUserTable,
  getUserByAcc,
  loginChk,
  generateToken,
  getPublicProfile,
  updateUserTransfer,
  updateUserWithdrawal,
} from "../services/user.services.js";

export const getAll = async (req, res) => {
  try {
    const savedUsers = await getAllUsers();
    res.send(savedUsers);
  } catch (error) {
    res.send(error.message);
  }
};
export const createAll = async (req, res) => {
  try {
    const savedUsers = await createAllUsers();
    savedUsers.map(async (user) => {
      const token = await generateToken(user);
    });
    res.send(" Succesfully created ! New data: " + savedUsers);
  } catch (error) {
    res.send(error.message);
  }
};
export const deleteAllUsers = async (req, res) => {
  try {
    const savedUsers = await deleteUsers();
    res.send(savedUsers);
  } catch (error) {
    res.send(error.message);
  }
};
export const getMe = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.send(error.message);
  }
};
export const getById = async (req, res) => {
  try {
    const personal_id = req.body.personal_id;
    const savedUsers = await getUserById(personal_id);
    res.send(savedUsers);
  } catch (error) {
    res.send(error.message);
  }
};
export const createUser = async (req, res) => {
  try {
    const user = req.body;
    await createNewUser(user);
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("E11000")) res.send("11000");
    else res.send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteById(req.query);
    const savedUsers = await getAllUsers();
    res.send(savedUsers);
  } catch (error) {
    res.send(error.message);
  }
};
export const updateTable = async (req, res) => {
  try {
    const users = req.body;
    await updateUserTable(users);
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("E11000")) res.send("11000");
    else res.send(error.message);
  }
};
export const updateTransfer = async (req, res) => {
  try {
    const transferObj = req.body;

    const transfer = await updateUserTransfer(transferObj);
    res.send(transfer);
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("E11000")) res.send("11000");
    else res.send(error.message);
  }
};
export const updateWithdrawal = async (req, res) => {
  try {
    const withdrawalObj = req.body;

    const withdrawal = await updateUserWithdrawal(withdrawalObj);
    res.send(withdrawal);
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("E11000")) res.send("11000");
    else res.send(error.message);
  }
};

export const getByAcc = async (req, res) => {
  try {
    const accountNum = req.body.accountNum;
    const savedUsers = await getUserByAcc(accountNum);
    res.send(savedUsers);
  } catch (error) {
    res.send(error.message);
  }
};

export const userLogin = async (req, res) => {
  try {
    const data = await loginChk(req.body);
    const token = await generateToken(data);
    const publicPro = await getPublicProfile(data);

    res.send({ data: publicPro, token });
  } catch (error) {
    res.send(error.message);
  }
};
export const loginOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await saveRemoveToken(req.user);
    res.send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
