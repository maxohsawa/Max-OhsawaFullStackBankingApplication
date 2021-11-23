const jwt = require('jsonwebtoken');

// middleware takes three parameters
module.exports = function(req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  // check if there is no token
  if(!token) {
    // return 401, not authorized
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.account = decoded.account;
    next();

  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}