const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const dal = require('../../db/api/dal');

// @route  GET api/transactions
// @desc   Get transactions belonging to account
// @access Private
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      // const transactions = await Transaction.find({ accountID: req.account.id }).sort({ date: 1 });
      const transactions = await dal.getTransactions(req.account.id);
      res.send(transactions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
    
  }
);

// @route POST api/transactions
// @desc Add transaction
// @access Private
router.post(
  '/',
  auth,
  async (req, res) => {
    
    const accountID = req.account.id;
    const { transactionType, amount } = req.body;

    // validate transaction type and amount
    if(!transactionType){
      return res.status(400).json({ msg: 'Error: no transaction type' });
    }
    if(amount <= 0){
      return res.status(400).json({ msg: 'Error: bad amount' });
    } 
    if(transactionType !== 'DEPOSIT' && transactionType !== 'WITHDRAWAL'){
      return res.status(400).json({ msg: 'Error: invalid transaction type' });
    }

    try {
      
      // get current balance
      const { balance } = await dal.getAccountById(accountID);
      let newBalance = 0;
      switch(transactionType){

        // deposit
        case 'DEPOSIT': {
          
          if(Number(amount) <= 0){
            return res.status(400).json({ msg: 'Error: deposit must be greater than zero' });
          }
          newBalance = Number(balance) + Number(amount);
          break;
        }

        // withdrawal
        case 'WITHDRAWAL': {

          if(Number(amount) > Number(balance)){
            return res.status(400).json({ msg: 'Error: withdrawal must be less than or equal to balance' });
          }
          newBalance = Number(balance) - Number(amount);
          break;
        }

        default : {
          return res.status(500).send('Server error');
        }
      }

      // // create new transaction
      // const newTransaction = new Transaction({
      //   accountID,
      //   transactionType,
      //   balanceBefore: Number(balance),
      //   amount: Number(amount),
      //   balanceAfter: Number(newBalance)
      // });

      // // save transaction
      // await newTransaction.save();

      const trans = await dal.addTransaction({ accountID, transactionType, balance, amount, newBalance });

      // update account
      const update = { balance: Number(newBalance) };
      // await Account.findByIdAndUpdate(accountID, update);
      const acc = await dal.updateAccountById(accountID, update);

      const account = await dal.getAccountById(accountID);
      return res.json(account);
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
)
module.exports = router;