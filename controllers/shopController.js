const { collection } = require('../model/productModel');
const Product = require('../model/productModel');

// rendering
exports.renderPage = async (req, res, next) => {
  const sortByReplace = function (url, newSort) {
    let urlOne;
    let urlTwo;
    let sortByNew;
    if (url.includes('sortBy=')) {
      urlOne = url.split('=')[0];
      urlTwo = `${urlOne}=${newSort}`;
    } else {
      return `sortBy=${newSort}`;
    }
    console.log(` sortBy splitted ${urlOne}`);
    console.log(`sort by new:${urlTwo}&`);
  };
  sortByReplace(
    'http://127.0.0.1:3000/shop/bra/bralette?sortBy=bestsellers&',
    'newest'
  );
  const { category, subCat } = req.params;
  const params = { category, subCat };
  const filter = { color: req.query.color, size: req.query.size };
  const sortBy = req.query.sortBy;
  let lastPart;
  if (!req.originalUrl.includes('?')) {
    lastPart = `${req.originalUrl}?`;
  } else {
    lastPart = req.originalUrl;
  }
  let productData;
  if (!subCat) {
    productData = await Product.find({ category: category });
  } else if (category && subCat) {
    productData = await Product.find({
      category: category,
      subCategory: subCat,
    });
  }
  // {"sizesAvailable.xl":{$gt:0},category:'BRA',}
  if (filter.size && subCat) {
    const size = filter.size.toLowerCase();
    productData = await Product.find({
      [`sizesAvailable.${size}`]: { $gt: 0 },
      category: category,
      subCategory: subCat,
    });
  } else if (filter.size && !subCat) {
    const size = filter.size.toLowerCase();
    productData = await Product.find({
      [`sizesAvailable.${size}`]: { $gt: 0 },
      category: category,
    });
  }
  // query for multiple colors and sizes
  if (filter.color) {
    let matchArray = [];

    //
    productData?.forEach((el) => {
      matchArray.push(el.colors.filter((el) => el.color == filter.color));
    });

    // removing empty array
    matchArray = matchArray.filter((el) => el != '').flat(3);

    // emptying the productData var

    productData = [];

    // searching for each of the elements
    for (let index = 0; index < matchArray.length; index++) {
      const element = matchArray[index];
      const item = await Product.find({ colors: element });
      // pushing matching elements to productData array
      productData.push(item);
      productData = productData.flat();
    }
  }
  if (sortBy) {
    if (sortBy == 'lowtohigh') {
      productData.sort(function (a, b) {
        return Number(a.price) - Number(b.price);
      });
    } else if (sortBy == 'hightolow') {
      productData.sort(function (a, b) {
        return Number(b.price) - Number(a.price);
      });
    } else if (sortBy == 'bestsellers') {
      productData.sort(function (a, b) {
        return b.timesSold - a.timesSold;
      });
    } else if (sortBy == 'rating') {
      productData.sort(function (a, b) {
        return b.rating - a.rating;
      });
    } else if (sortBy == 'newest') {
      productData.sort(function (a, b) {
        // Turn strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    } else if (sortBy == 'oldest') {
      console.log(sortBy);
      productData.sort(function (a, b) {
        // Turn strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
  }
  console.log(req.query);
  // console.log(productData);
  // if(req.originalUrl.slice)
  // console.log(`lastpart:${lastPart}`);
  const hostUrl = `${req.protocol}://${req.get('host')}${lastPart}`;
  // const hostUrl = baseUrl;
  const sort = req.query.sortBy;
  console.log(hostUrl);
  // console.log(params);
  // console.log(filter);
  // console.log(sort);
  // console.log(req.params);
  //
  res.status(200).render('shop-template', {
    params,
    filter,
    sort,
    hostUrl,
    productData,
    sortByFunc: function (url, newSort) {
      let urlOne;
      let urlTwo;
      let sortByNew;
      if (url.includes('sortBy=')) {
        urlOne = url.split('=')[0];
        urlTwo = `${urlOne}=${newSort}`;
      }
      console.log(` sortBy splitted ${urlOne}`);
      console.log(`sort by new:${urlTwo}&`);
      return `${urlTwo}&`;
    },
  });
  next();
};

//
exports.getOneProduct = async (req, res) => {
  console.time();
  try {
    const queryParams = { ...req.params };
    const queryObj = { ...req.query };
    let data;
    let id = queryParams.productID;

    let all = await Product.find();

    data = all.find((el) => el.ProductID === id);

    if (queryObj?.color) {
      let color = queryObj.color.toLowerCase();
      // change images for the corresponding images/color
    }
    res.status(200).json({
      staus: 'Success',
      results: data?.length,
      queryCheck: id,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'Fail',
      message: 'bad request,check',
      err: error,
    });
  }
  console.timeEnd();
};
// { ProductID: "LCE-16633236" }
