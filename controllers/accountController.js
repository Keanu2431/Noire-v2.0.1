const User = require('../model/userModel');
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
