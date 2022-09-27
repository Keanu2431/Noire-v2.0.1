const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Number,
    default: new Date().getTime(),
  },
  firstName: { type: String },
  lastName: { type: String },
  emailAddress: {
    type: String,
    required: [true, 'User Needs An Email'],
    set: (v) => v.toLowerCase(),
    unique: true,
  },
  userName: {
    required: [true, 'Needs a username'],
    type: String,
    set: (v) => v.toLowerCase(),
    unique: true,
  },
  password: { required: [true, 'Needs a password'], type: String },
  phoneNumber: { type: String, unique: true },
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
