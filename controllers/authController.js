const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../model/userModel');
console.log();
exports.protect = async function (req, res, next) {
  try {
    // 1) get token and check if exist
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
      console.log(token);
    }
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
      throw { status: 'fail', status: 401, message: 'User no longer exist' };
    }
    // check if user changed pass after token was issued

    // grant access
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      error,
    });
  }
};
exports.isLoggedIn = async function (req, res, next) {
  try {
    // 1) get token and check if exist
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
      console.log(token);
      console.log('token isLogged');
    }
    if (!token) {
      return next();
    }
    // 2) validate/verify token
    // decoded tokeen
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET_STRING
    );
    //   3)check if user still exist
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('user no exxist');
      return next();
    }
    // check if user changed pass after token was issued

    // grant access
    res.locals.user = user;
    console.log('you should be good');
    next();
  } catch (error) {
    console.log('user is not logged in.');
    return next();
  }
};
exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    try {
      // roles is an array of args
      if (!roles.includes(req.user.role)) {
        console.log(req.user.role);
        throw {
          message: 'role not permitted for this action',
        };
      }
      next();
    } catch (error) {
      res.status(403).json({
        status: 'unauthorized/forbidden',
        data: error,
      });
    }
  };
};
