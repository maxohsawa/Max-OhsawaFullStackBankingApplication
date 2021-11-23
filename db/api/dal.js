const bcrypt = require('bcryptjs');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

const getAccountById = async (id) => {
  const account = await Account.findById(id).select('-password');
  return account;
}

const getAccountByEmail = async (email) => {
  const account = await Account.findOne({ email });
  return account;
}

const createAccount = async ({ name, email, password }) => {

      const account = new Account({
        name,
        email,
        password,
        balance: 0
      });

      const salt = await bcrypt.genSalt(10);
      account.password = await bcrypt.hash(password, salt);

      const res = await account.save();

      return res;
}

const getTransactions = async (id) => {
  const transactions = await Transaction.find({ accountID: id }).sort({ date: 1 });
  return transactions;
}

const addTransaction = async ({ accountID, transactionType, balance, amount, newBalance }) => {
        // create new transaction
        const newTransaction = new Transaction({
          accountID,
          transactionType,
          balanceBefore: Number(balance),
          amount: Number(amount),
          balanceAfter: Number(newBalance)
        });
  
        // save transaction
        const res = await newTransaction.save();
        return res;
}

const updateAccountById = async (accountID, update) => {
  const res = await Account.findByIdAndUpdate(accountID, update);
  return res;
}

exports.getAccountById = getAccountById;
exports.getAccountByEmail = getAccountByEmail;
exports.createAccount = createAccount;
exports.getTransactions = getTransactions;
exports.addTransaction = addTransaction;
exports.updateAccountById = updateAccountById;