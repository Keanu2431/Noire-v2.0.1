const fs = require('fs');
const Product = require('../model/productModel');

// handlers
exports.getProducts = async (req, res) => {
  // 127.0.0.1:3000/products/bras/bralette?sortBy=LowToHigh&color=black&size=M
  // sort by price,  rating, new arrivals, relevancee
  // filter size,color
  try {
    const queryObj = { ...req.query };
    const queryParams = { ...req.params };
    const sub = queryParams.subCat?.toUpperCase();
    console.log(queryObj);
    console.log(queryParams);
    let data;
    //finding all items in the category
    if (queryParams.category) {
      // subCategory: sub
      data = await Product.find({
        category: queryParams.category.toUpperCase(),
      });
    }
    // 1) turn the query into a string

    // filtering subCat
    if (queryParams.subCat) {
      data = await Product.find({ subCategory: sub });
    }
    // filtrering color
    if (queryObj.color) {
      // 1) we're going to take the colors matched in the array then find each item with a loop
      let matchArray = [];

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
    // filetering sizes
    if (queryObj.size) {
      const size = queryObj.size.toLowerCase();

      // console.log(size);
      let matchArray = [];

      data?.forEach((el) => {
        matchArray.push(el.sizesAvailable);
      });

      // pushing the proper element that need to be matched
      matchArray = matchArray.filter((el) => el[size] > 0);
      // clearing data
      data = [];
      // pushing in the matching data
      for (let index = 0; index < matchArray.length; index++) {
        const element = matchArray[index];
        const item = await Product.find({ sizesAvailable: element });
        data.push(item);
      }
    }
    // sorting
    // by price
    if (queryObj.sortBy) {
      const sort = queryObj.sortBy;
      if (sort == 'LowToHigh') {
        data.sort(function (a, b) {
          // function compareFn(a, b) {
          //   if (a is less than b by some ordering criterion) {
          //     return -1;
          //   }
          //   if (a is greater than b by the ordering criterion) {
          //     return 1;
          //   }
          //   // a must be equal to b
          //   return 0;
          // }

          // if b is greater than a, it will return back a neg number
          return a.price - b.price;
        });
      } else if (sort == 'HighToLow') {
        data.sort(function (a, b) {
          return b.price - a.price;
        });
      } else if (sort == 'Rating') {
        data.sort(function (a, b) {
          return b.rating - a.rating;
        });
      }
    }
    // limit results next, maybe use middleware func?

    res.status(200).json({
      status: 'success',
      results: data.length,
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
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    });
  }
};
