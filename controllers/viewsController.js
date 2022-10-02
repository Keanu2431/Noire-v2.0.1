const util = require('util');
const User = require('../model/userModel');
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
    console.log('locals');
    console.log(res.locals);
    res.status(200).render('home');
    next();
  } catch (error) {
    return next();
  }
};
exports.renderProfile = async (req, res, next) => {
  res
    .status(200)
    .render('profile', { user: 'Keanu2431', name: 'Keanu Lumpkin' });
  next();
};
exports.renderOrders = async (req, res, next) => {
  res
    .status(200)
    .render('orders', { user: 'Keanu2431', name: 'Keanu Lumpkin' });
  next();
};
exports.renderWishlist = async (req, res, next) => {
  res
    .status(200)
    .render('wishlist', { user: 'Keanu2431', name: 'Keanu Lumpkin' });
  next();
};
exports.renderResetPass = async (req, res, next) => {
  res
    .status(200)
    .render('reset-pass', { user: 'Keanu2431', name: 'Keanu Lumpkin' });
  next();
};
exports.renderPayment = async (req, res, next) => {
  res
    .status(200)
    .render('pay-info', { user: 'Keanu2431', name: 'Keanu Lumpkin' });
  next();
};
exports.renderShipping = async (req, res, next) => {
  res
    .status(200)
    .render('ship-info', { user: 'Keanu2431', name: 'Keanu Lumpkin' });
  next();
};
exports.render_E_Pref = async (req, res, next) => {
  res
    .status(200)
    .render('e-pref', { user: 'Keanu2431', name: 'Keanu Lumpkin' });
  next();
};
// router.get('/account/email-preferences', viewsController.render_E_Pref);
