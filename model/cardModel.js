const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cardSchema = new mongoose.Schema({
  cardHolder: { type: String, required: [true, 'needs a card holder name'] },
  cardNumber: {
    type: Number,
    required: [true, 'needs a card number'],
    maxLength: 16,
    minLength: 15,
  },
  lastFour: { type: Number, required: [true, 'needs last fours'] },
  firstOne: { type: Number, required: [true, 'needs first'] },
  expiration: { type: String, required: [true, 'needs exp'] },
  cvv: { type: String, required: [true, 'needs cvv'] },
  // billing
  firstName: {
    type: String,
    set: (v) => v.toLowerCase(),
    required: [true, 'Needs first name'],
  },
  lastName: {
    type: String,
    set: (v) => v.toLowerCase(),
    required: [true, 'Needs last name'],
  },
  addressOne: { type: String, required: [true, 'Needs Address'] },
  addressTwo: { type: String },
  city: { type: String, required: [true, 'Needs city'] },
  state: {
    type: String,
    set: (v) => v.toUpperCase(),
    required: [true, 'Needs state'],
  },
  zipcode: { type: Number, required: [true, 'Needs zipcode'] },
  country: { type: String, required: [true, 'Needs country'] },
  billingPhone: { type: String },
});

cardSchema.pre('save', async function (next) {
  // if password hasn't been modified, exit the function and move to next middleware
  if (!this.isModified('cardNumber')) return next();
  this.cardNumber = await bcrypt.hash(String(this.cardNumber), 16);
  this.cvv = await bcrypt.hash(String(this.cvv), 16);
});

const Card = mongoose.model('Cards', cardSchema);
module.exports = Card;
