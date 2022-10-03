const User = require('../model/userModel');
const Product = require('../model/productModel');
const jwt = require('jsonwebtoken');
const util = require('util');

exports.updateBasic = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    const data = req.body;
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET_STRING
    );
    console.log('id');
    console.log(decoded.id);
    const newUserInfo = await User.findOneAndUpdate(
      { _id: decoded.id },
      { $set: { data: data } }
    );
    newUserInfo.save();
    // console.log(data);
    res.status(200).json({
      status: 'success',
      data: newUserInfo,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: 'fail',
    });
  }
};
