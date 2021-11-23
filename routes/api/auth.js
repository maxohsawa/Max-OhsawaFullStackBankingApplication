const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const dal = require('../../db/api/dal');

// @route  GET api/auth
// @desc   Get account
// @access Private
router.get(
  '/', 
  auth, 
  async (req, res) => {
    try {
      // const account = await Account.findById(req.account.id).select('-password');
      const account = await dal.getAccountById(req.account.id);
      res.json({
        account
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route  POST api/auth
// @desc   Login account / authenticate user and get token
// @access Public
router.post(
  '/',
  [ // express-validator middleware
    check('email', 'Please use a valid email address')
      .isEmail(),
    check('password', 'Password is required')
      .exists()
  ], 
  async (req, res) => {
    // handle errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // handle login
    try {
      // check if account exists for email
      // let account = await Account.findOne({ email });
      let account = await dal.getAccountByEmail(email);

      if(!account) {
        return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });
      }

      // compare passwords
      const isMatch = await bcrypt.compare(password, account.password);

      if(!isMatch) {
        return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });
      }

      // create payload
      const payload = {
        account: {
          id: account.id
        }
      }

      // sign and respond with token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

  }
);

module.exports = router;