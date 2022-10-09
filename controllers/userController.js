const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const Card = require('../model/cardModel');

const emailExtension = [
  `@yahoo.com`,
  `@gmail.com`,
  `@outlook.com`,
  `@icloud.com`,
];

const validSpecialCharactersPassword = [`@`, `$`, `#`, `_`, `!`, `%`, `&`];
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const capitals = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET_STRING, {
    expiresIn: process.env.JWT_EXP,
  });
};
const responseCookie = function () {};
exports.createUser = async (req, res) => {
  try {
    const bodyReq = req.body;
    // checking to see if email is unique and valid
    if (
      bodyReq.emailAddress.includes(` `) ||
      bodyReq.emailAddress.length === 0 ||
      (!bodyReq.emailAddress.toLowerCase().includes(emailExtension[0]) &&
        !bodyReq.emailAddress.toLowerCase().includes(emailExtension[1]) &&
        !bodyReq.emailAddress.toLowerCase().includes(emailExtension[2]) &&
        !bodyReq.emailAddress.toLowerCase().includes(emailExtension[3]))
    ) {
      throw {
        message: 'user email is invalid',
        code: 460,
        keyPattern: {
          emailAddress: 1,
        },
        keyValue: {
          emailAddress: bodyReq.emailAddress.toLowerCase(),
        },
      };
    }
    // checking to see if username is valid
    else if (
      bodyReq.userName.includes(` `) ||
      bodyReq.userName.length < 8 ||
      bodyReq.userName.length > 32
    ) {
      throw {
        message: 'username is invalid ',
        code: 461,
        keyPattern: {
          userName: 1,
        },
        keyValue: {
          userName: bodyReq.userName.toLowerCase(),
        },
      };
    }
    // checking to see if password is valid
    else if (
      bodyReq.password.includes(` `) ||
      bodyReq.password.length < 8 ||
      bodyReq.password.length > 32 ||
      // spreads the password then checks if it contains one of the elements from the validSpecialCharactersPassword Array using the !(NOT) operator
      ![...bodyReq.password].some((i) =>
        validSpecialCharactersPassword.includes(i)
      ) ||
      ![...bodyReq.password].some((i) => capitals.includes(i)) ||
      [...bodyReq.password].some((i) => digits.includes(i))
    ) {
      throw {
        message: 'user password is invalid',
        code: 462,
        keyPattern: {
          password: 1,
        },
        keyValue: {
          password: bodyReq.password.toLowerCase(),
        },
      };
    }
    //
    // token
    // parameters are (payload,secretstring aka secret)
    // expiration time option
    //
    const properData = {
      emailAddress: bodyReq.emailAddress,
      userName: bodyReq.userName,
      password: bodyReq.password,
    };
    const newUser = await User.create(properData);
    const token = signToken(newUser._id);
    res.cookie('jwt', token, {
      expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXP),
      httpOnly: true,
      // secure: true,
    });
    res.status(201).json({
      status: 'success',
      // sending the token essentially logs the user in when creating an account
      token,
      message: `user registered ${newUser.userName}`,
      user: { username: newUser.userName, email: newUser.emailAddress },
    });
  } catch (error) {
    console.log(req.body);
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error: error,
      details: 'something went wrong',
    });
  }
};
exports.editPassword = async (req, res) => {
  try {
    const newPassword = await User.findOneAndUpdate(
      req.body.userName,
      {
        password: req.body.newPassword,
      },
      { new: true }
    );
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newPassword,
      },
      body: req.body,
    });
  } catch (error) {
    res.status(400).json({
      status: 'bad request',
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'bad request path does not exist',
    });
  }
  // here
};
exports.loginAuth = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userName, password, stayLogged } = req.body;
    console.log(userName, password);
    // check if username and password were submitted
    if (!userName || !password) {
      throw {
        code: 400,
        message: 'Please provide both an password and a username',
      };
    }
    // check if user exist and pass is correct
    // adding select('+field') makes it so we get the field in the output that we hid in model
    const user = await User.findOne({ userName }).select('+password');
    // const correctPass = await user.correctPassword(password, user.password);

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw {
        code: 401,
        status: 'unauthorized login attempt',
        message: 'incorrect user or password',
      };
    }
    // const compareBcrypt = await bcrypt.hash(password, 16);
    console.log('logged in');
    if (stayLogged == 'on') {
      console.log('forever logged');
    }
    //
    const token = signToken(user._id);
    res.cookie('jwt', token, {
      expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXP),
      httpOnly: true,
      // secure: true,
    });
    res.status(200).json({
      status: 'success',
      // token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
  // if okay send token to client
};
exports.logout = async (req, res) => {
  try {
    res.cookie('jwt', 'loggedOut', {
      expires: new Date(Date.now() + 3000),
      httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'internal service error',
    });
  }
};
// {"userName":"keanu2431","password":"B@bycat19"}
