const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  accountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
    required: true
  },
  transactionType: {
    type: String,
    required: true
  },
  balanceBefore: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  balanceAfter: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);