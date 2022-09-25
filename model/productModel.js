const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: { required: [true, 'Product Needs A Category'], type: String },
  subCategory: {
    required: [true, 'Product Needs A Sub-Category'],
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Product Needs A Name'],
    unique: [true, 'Product Needs A Unique Name'],
  },
  ProductID: {
    type: String,
    required: [true, ' Needs a UNIQUE 8 digit ID (SubCat Abbreviation+Number)'],
    unique: true,
    // Math.floor(10000000 + Math.random() * 50000000)
  },
  description: {
    required: [true, 'Needs A desciption'],
    type: String,
  },
  reccomended: {
    type: Array,
    default: [],
  },
  reviews: { default: [], type: Array },
  details: {
    type: Array,
    default: ['Made from the finest cloth for affordability'],
  },
  price: { required: [true, 'Needs A price'], type: Number },
  colors: {
    required: [
      true,
      'List the colors and quantities as an object including the images,sizes and color name',
    ],
    type: Array,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
