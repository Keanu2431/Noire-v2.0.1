const Product = require('../model/productModel');

exports.getOneProduct = async (req, res) => {
  console.log('route');
  try {
    // let item = req.params.productID;
    // console.log(item);
    const data = await Product.find({ ProductID: 'PJS-31705316' });
    res.status(200).json({
      staus: 'Success',
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'Fail',
      message: 'bad request',
      err: error,
    });
  }
};
// { ProductID: 'PJS-31705316' }
