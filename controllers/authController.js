const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../model/userModel');
exports.protect = async function (req, res, next) {
  try {
    // 1) get token and check if exist
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    console.log(token);
    if (!token) {
      throw {
        code: 401,
        message: 'You are not logged in, nor authorized',
      };
    }
    // 2) validate/verify token
    // decoded tokeen
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET_STRING
    );
    console.log(decoded);
    //   3)check if user still exist
    const user = await User.findById(decoded.id);
    if (!user) {
      throw { status: 'fail', status: 404, message: 'User no longer exist' };
    }
    // check if user changed pass after token was issued

    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      error,
    });
  }
};
