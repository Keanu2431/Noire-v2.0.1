const util = require('util');
const User = require('../model/userModel');
const Card = require('../model/cardModel');
const jwt = require('jsonwebtoken');
exports.renderHome = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
      const decoded = await util.promisify(jwt.verify)(
        token,
        process.env.SECRET_STRING
      );
      const user = await User.findById(decoded.id);
      if (user) {
        res.locals.user = user;
      }
    }
    // console.log('locals');
    // console.log(res.locals);
    res.status(200).render('home');
    next();
  } catch (error) {
    console.log(error);
    res.status(400).render('home');

    return next();
  }
};
exports.renderProfile = async (req, res, next) => {
  res.status(200).render('profile');
  next();
};
exports.renderOrders = async (req, res, next) => {
  const user = await User.findById(res.locals.user._id);
  const orders = user.userOrders;
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  console.log(orders[3]);
  res.status(200).render('orders', { orders, months });
  next();
};
exports.renderWishlist = async (req, res, next) => {
  res.status(200).render('wishlist');
  next();
};
exports.renderResetPass = async (req, res, next) => {
  res.status(200).render('reset-pass');
  next();
};
exports.renderPayment = async (req, res, next) => {
  const card_ID_Array = res.locals.user.userCards;

  res.status(200).render('pay-info', { cards: card_ID_Array });
  next();
};
exports.renderShipping = async (req, res, next) => {
  const shippingArr = res.locals.user.userShipping;
  res.status(200).render('ship-info', { shipping: shippingArr });
  next();
};
exports.render_E_Pref = async (req, res, next) => {
  res.status(200).render('e-pref');
  next();
};
// router.get('/account/email-preferences', viewsController.render_E_Pref);
