const User = require('../model/userModel');
const Product = require('../model/productModel');
exports.renderHTML = async (req, res) => {
  try {
    res.status(200).json({
      message: 'hi',
    });
    // const data = await Product.find({});
    // res.status(200).json({
    //   status: 'success',
    //   results: data.length,
    //   data: data,
    // });
  } catch (error) {
    // res.status(400).json({
    //   status: 'Fail',
    //   message: 'Bad Request',
    //   error: error,
    // });
  }
};
