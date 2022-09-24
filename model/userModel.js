const mongoose = require('mongoose');
const { use } = require('../routes/braRoutes');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  emailAddress: { type: String, required: [true, 'User Needs An Email'] },
  userName: { required: [true, 'Needs a username'], type: String },
  password: { required: [true, 'Needs a password'], type: String },
  phoneNumber: String,
  birthDay: String,
  braSize: String,
  braletteSize: String,
  pantySize: String,
  lingerieSize: String,
  //   users cart Array
  userCart: { type: Array, required: [false], default: [] },
  //   users wishlist Array
  userWishlist: { type: Array, required: [false], default: [] },
  //   users orders Array
  userOrders: { type: Array, required: [false], default: [] },
  //   users paymentInfo Array
  userCards: { type: Array, required: [false], default: [] },
  //   users shipping Array
  userShipping: { type: Array, required: [false], default: [] },
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
