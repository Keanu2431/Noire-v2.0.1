const User = require('../model/userModel');
const Card = require('../model/cardModel');
const Product = require('../model/productModel');
const jwt = require('jsonwebtoken');
const util = require('util');
const crypto = require('crypto');

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
    const newCard = await Card.create(data);
    console.log(newCard);
    console.log('card id');
    const newUserInfo = await User.findByIdAndUpdate(
      decoded.id,
      {
        $push: { userCards: newCard._id },
      },

      { new: true }
    );
    res.status(200).json({ status: 'succes', newUserInfo, newCard });
  } catch (error) {
    console.log(error);
    res.status(204).json({});
    next();
  }
};
exports.decrypt = (el) => {
  let iv = crypto.randomBytes(16);
  let decipher = crypto.createDecipheriv(
    'aes-256-ccm',
    process.env.SECRET_STRING,
    iv
  );
  let decrypt = decipher.update(el, 'utf-8', 'hex');
  decrypt += decipher.final('utf-8');
};

//

// // Defining algorithm
// const algorithm = 'aes-256-cbc';
// // Defining key
// const key = crypto.randomBytes(32);
// // Defining iv
// const iv = crypto.randomBytes(16);
// // An encrypt function
// function encrypt(text) {
//   // Creating Cipheriv with its parameter
//   let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

//   // Updating text
//   let encrypted = cipher.update(text);

//   // Using concatenation
//   encrypted = Buffer.concat([encrypted, cipher.final()]);

//   // Returning iv and encrypted data
//   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

// // Displays output
// var output = encrypt('4444000032872354');
// console.log(output);
