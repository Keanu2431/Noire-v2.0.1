const User = require('../model/userModel');
const Card = require('../model/userModel');
const Product = require('../model/productModel');
const jwt = require('jsonwebtoken');
const util = require('util');

exports.updateBasic = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    const reqData = req.body;
    const data = {
      firstName: reqData.firstName,
      lastName: reqData.lastName,
      phoneNumber: reqData.phoneNumber,
      birthDay: reqData.birthDay,
      braSize: reqData.braSize,
      braletteSize: reqData.braletteSize,
      pantySize: reqData.pantySize,
      lingerieSize: reqData.lingerieSize,
    };
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET_STRING
    );
    const newUserInfo = await User.findByIdAndUpdate(
      decoded.id,
      {
        ...data,
      },
      { new: true }
    );
    newUserInfo.save();
    // console.log(data);
    res.status(200).json({
      status: 'success',
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: 'fail',
    });
  }
};
exports.addCard = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    const reqData = req.body;
    const data = {
      cardHolder: reqData.cardHolder,
      cardNumber: reqData.cardNumber,
      firstOne: String(reqData.cardNumber).slice(0, 1),
      lastFour: String(reqData.cardNumber).slice(-4),
      expiration: reqData.expiration,
      cvv: reqData.cvv,
      firstName: reqData.firstName,
      lastName: reqData.lastName,
      addressOne: reqData.addressOne,
      addressTwo: reqData.addressTwo,
      city: reqData.city,
      state: reqData.state,
      zipcode: reqData.zipcode,
      country: reqData.country,
      billingPhone: reqData.billingPhone,
    };
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET_STRING
    );
    // const newCard = await Card.create(data);
    console.log('card id');
    // console.log(newCard._id);
    const newUserInfo = await User.findByIdAndUpdate(
      decoded.id,
      {
        userCards: 'byy',
      },
      { new: true }
    );
    res.status(200).json({ status: 'succes', data: newUserInfo });
  } catch (error) {
    console.log(error);
    res.status(204).json({});
    next();
  }
};
