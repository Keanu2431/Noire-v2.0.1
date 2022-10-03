const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  createdAt: {
    type: Number,
    default: new Date().getTime(),
  },
  firstName: {
    type: String,
    // set: (v) => v.charAt(0).toUpperCase() + v.slice(1),
  },
  lastName: {
    type: String,
    set: (v) => v.charAt(0).toUpperCase() + v.slice(1),
  },
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
  role: { type: String, enum: ['CLIENT', 'ADMIN'], default: 'CLIENT' },
  password: {
    required: [true, 'Needs a password'],
    type: String,
    select: false,
  },
  phoneNumber: { type: String, unique: false },
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
  passwordChangedAt: Number,
});
// middleware that runs between the time we recieve the data and time we save to database
userSchema.pre('save', async function (next) {
  // if password hasn't been modified, exit the function and move to next middleware
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 16);
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword);
  console.log(userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = async function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    console.log(this.passwordChangedAt, jwtTimestamp);
  }
  return false;
};
const User = mongoose.model('Users', userSchema);
module.exports = User;
