const User = require('../model/userModel');
const Card = require('../model/cardModel');
const Product = require('../model/productModel');
const jwt = require('jsonwebtoken');
const util = require('util');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
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
exports.updateBasic = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    const data = req.body;
    console.log(data);
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET_STRING
    );
    console.log('id');
    console.log(decoded.id);
    const newUserInfo = await User.findOneAndUpdate({ _id: decoded.id }, data, {
      new: true,
    });
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
exports.updatePassword = async (req, res, next) => {
  try {
    const reqData = req.body;
    const currentPassword = reqData.currentPassword;
    const newPasswordOne = reqData.newPasswordOne;
    const newPasswordTwo = reqData.newPasswordTwo;
    const user = await User.findById(res.locals.user._id).select('+password');
    console.log(currentPassword, newPasswordOne, newPasswordTwo);

    if ((await user.correctPassword(currentPassword, user.password)) !== true)
      throw 'Wrong Password';
    if (newPasswordOne !== newPasswordTwo) throw "Passwords Don't Match";
    if (
      newPasswordOne.includes(` `) ||
      newPasswordOne.length < 8 ||
      newPasswordOne.length > 32 ||
      // spreads the password then checks if it contains one of the elements from the validSpecialCharactersPassword Array using the !(NOT) operator
      ![...newPasswordOne].some((i) =>
        validSpecialCharactersPassword.includes(i)
      ) ||
      ![...newPasswordOne].some((i) => capitals.includes(i)) ||
      [...newPasswordOne].some((i) => digits.includes(i))
    )
      throw 'Invalid New Password';
    const hashedNewPassword = await bcrypt.hash(newPasswordOne, 16);
    console.log(`hashed:${hashedNewPassword}`);
    const updatedUser = await User.findByIdAndUpdate(
      res.locals.user._id,
      { password: hashedNewPassword },
      { new: true }
    );
    console.log(user.password);
    res.status(200).json({
      status: 'success',
      newPassword: newPasswordOne,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.addCard = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    const reqData = req.body;
    const encryptInfo = encrypt(String(reqData.cardNumber));
    const data = {
      cardHolder: reqData.cardHolder,
      cardNumber: String(encryptInfo.encryptedData),
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
      iv: encryptInfo.iv,
    };
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET_STRING
    );
    const newCard = await Card.create(data);
    console.log('card id');
    console.log(newCard._id);
    const newUserInfo = await User.findByIdAndUpdate(
      decoded.id,
      {
        $push: { userCards: newCard },
      },

      { new: true }
    );
    res.status(200).json({ status: 'succes' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'fail' });
    next();
  }
};
exports.deleteCard = async (req, res, next) => {
  try {
    // const user = await User.findById(res.locals.user._id);
    // const userCards = user.userCards;
    // console.log(userCards);
    const cardObj = req.body;
    console.log(cardObj);
    const delCard = await Card.findOneAndDelete(cardObj);
    const updatedInfo = await User.findByIdAndUpdate(res.locals.user._id, {
      $pull: { userCards: delCard },
    });
    console.log(delCard);
    res.status(200).json({
      status: 'success',
      data: {
        delCard,
        updatedInfo: updatedInfo.userCards,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'bad request',
    });
  }
};
exports.editCard = async (req, res, next) => {
  try {
    const { query, index, sendDataForm } = req.body;
    // console.log(query);
    // console.log(index);
    // console.log(sendDataForm);
    const user = await User.findOne(res.locals.user._id).then((doc) => {
      item = doc.userCards[index];
      for (const [key, value] of Object.entries(sendDataForm)) {
        console.log(`${key}:${value}`);
        item[key] = value;
      }
      doc.save();
      console.log(item);
    });
    // console.log(user.userName);
    // const user = await User.updateOne(
    //   res.locals.user._id,
    //   {
    //     $set: { 'userCards.$.cardHolder': sendDataForm.cardHolder },
    //   },
    //   { new: true }
    // );
    // const card = await Card.findOneAndUpdate(
    //   query,
    //   { ...sendDataForm },
    //   {
    //     new: true,
    //   }
    // );
    // const cardInArr = user.userCards[index];
    res.status(200).json({
      data: user,
      query,
      index,
      // cardInArr,
      // card,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: 'Bad request',
    });
  }
};
exports.getCard = async (req, res, next) => {
  try {
    const index = req.params.index;
    console.log(index);
    const user = await User.findById(res.locals.user._id);
    const cardInfo = user.userCards[index];
    const {
      cardHolder,
      lastFour,
      expiration,
      firstName,
      lastName,
      addressOne,
      addressTwo,
      city,
      state,
      zipcode,
      billingPhone,
    } = cardInfo;
    res.status(200).json({
      status: 'success',
      data: {
        cardHolder,
        lastFour,
        expiration,
        firstName,
        lastName,
        addressOne,
        addressTwo,
        city,
        state,
        zipcode,
        billingPhone,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};
exports.addShipping = async (req, res, next) => {
  try {
    const reqData = req.body;
    console.log(reqData);
    const user = await User.findByIdAndUpdate(
      res.locals.user._id,
      { $push: { userShipping: reqData } },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      data: user.userShipping,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'bad error',
    });
  }
};
exports.deleteShipping = async (req, res, next) => {
  try {
    const reqData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      addressOne: req.body.addressOne,
    };
    // delete reqData.index;
    console.log(reqData);
    const { index } = req.body;
    console.log(index);
    const user = await User.findByIdAndUpdate(res.locals.user._id, {
      $pull: { userShipping: reqData },
    });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'bad request' });
  }
};
const message = 'my namem is keane';
//
const algorithm = 'aes-256-cbc';
// Defining key
const key = process.env.SECRET_STRING_ENCRYPT;
// Defining iv
const iv = crypto.randomBytes(16);
const decrypt = (text) => {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');

  // Creating Decipher
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
};
const encrypt = (text) => {
  // Defining algorithm

  // An encrypt function

  // Creating Cipheriv with its parameter
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  // Updating text
  let encrypted = cipher.update(text);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning iv and encrypted data
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};
// console.log(encrypt(String('4450095439044343')));
// const encrypted = encrypt(message);
// console.log(decrypt(encrypted));
// console.log(key);
// console.log(
//   Card.findById(User.findById('633743de92a302ac7f74be24').userCards[0])
// );
const findToDecrypt = async (userID, cardPosition) => {
  const cardID = (await User.findById(userID)).userCards[cardPosition - 1];
  const card = await Card.findById(cardID);
  const cardObj = { iv: card.iv, encryptedData: card.cardNumber };
  return decrypt(cardObj);
};
// findToDecrypt('633743de92a302ac7f74be24', 2).then((x) => {
//   console.log(x);
// });
// test
