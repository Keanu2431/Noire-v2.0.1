const fs = require('fs');
const Product = require('../model/productModel');

// handlers
exports.getProducts = async (req, res) => {
  // 127.0.0.1:3000/products/bras/bralette?sortBy=LowToHigh&color=black&size=M
  // sort by price, top rated, new arrivals
  // filter size,color
  try {
    const queryObj = { ...req.query };
    const queryParams = { ...req.params };
    const sub = queryParams.subCat?.toUpperCase();
    console.log(queryObj);
    let data;
    // let subCat;
    // 1) turn the query into a string

    // filtering cat&subCat
    if (queryParams.subCat) {
      console.log(sub);
      // subCategory: sub
      data = await Product.find({ subCategory: sub });
    }
    if (queryObj.color) {
      // console.log(data[0].colors[0].color);
      // 1) we're going to take the colors matched in the array then find each item with a loop
      let matchArray = [];
      // data = [];
      //
      data?.forEach((el) => {
        matchArray.push(el.colors.filter((el) => el.color == queryObj.color));
      });

      // removing empty array
      matchArray = matchArray.filter((el) => el != '').flat(3);

      // emptying the data var

      data = [];

      // searching for each of the elements
      for (let index = 0; index < matchArray.length; index++) {
        const element = matchArray[index];
        const item = await Product.find({ colors: element });
        // pushing matching elements to data array
        data.push(item);
        data = data.flat();
      }
    }
    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: 'bad request',
      err: error,
    });
  }
};

exports.postNewProduct = async (req, res) => {
  try {
    const newBra = await Bras.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newBra,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    });
  }
};
