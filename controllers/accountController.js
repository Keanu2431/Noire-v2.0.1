const User = require('../model/userModel');
const Product = require('../model/productModel');
exports.updateBasic = async (req, res, next) => {
  try {
    const data = req.body;
    // User.findByIdAndUpdate
    console.log(data);
    next();
  } catch (error) {}
};
