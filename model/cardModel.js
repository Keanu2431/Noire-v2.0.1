const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const cardSchema = new mongoose.Schema({
  cardHolder: { type: String, required: [true, 'needs a card holder name'] },
  cardNumber: {
    type: String,
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

const algorithm = 'aes-256-cbc';
// Defining key
const key = crypto.randomBytes(32);
// Defining iv
const iv = crypto.randomBytes(16);

cardSchema.pre('save', async function (next) {
  // if password hasn't been modified, exit the function and move to next middleware
  if (!this.isModified('cardNumber')) return next();
  //   this.cardNumber = await bcrypt.hash(String(this.cardNumber), 16);
  this.cardNumber = cardSchema.methods.encrypt(this.cardNumber);
  this.cvv = await bcrypt.hash(String(this.cvv), 16);
  // this.
});

cardSchema.methods.encrypt = (text) => {
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
cardSchema.methods.decrypt = (text) => {
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
// Displays output
// var output = cardSchema.methods.encrypt('4444000032872354');
// console.log(output);

// console.log(cardSchema.methods.decrypt(output));
const Card = mongoose.model('Cards', cardSchema);
module.exports = Card;
