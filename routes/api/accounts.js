const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const dal = require('../../db/api/dal');

// @route  POST api/accounts
// @desc   Register account
// @access Public
router.post(
  '/',
  [ // express-validator middleware
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please use a valid email address')
      .isEmail(),
    check('password', 'Please enter a password with at least 6 characters')
      .isLength({ min: 6 })
  ], 
  async (req, res) => {
    // handle errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    // handle registration
    try {
      // check if email is already used
      const accountCheck = await dal.getAccountByEmail(req.body.email);

      if(accountCheck) {
        return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
      }

      const account = await dal.createAccount(req.body);

      // return jsonwebtoken
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