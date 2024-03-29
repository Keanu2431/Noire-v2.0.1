const { collection } = require('../model/productModel');
const Product = require('../model/productModel');
const User = require('../model/userModel');

// rendering
exports.renderPage = async (req, res, next) => {
  try {
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
    const hostUrl = `${req.protocol}://${req.get('host')}${lastPart}`;

    const sort = req.query.sortBy;
    console.log(hostUrl);

    res.status(200).render('shop-template', {
      params,
      filter,
      sort,
      hostUrl,
      productData,
      sortByFunc: function (url, newSort) {
        let urlOne;
        let urlTwo;
        if (url.includes('sortBy=')) {
          urlOne = url.split('=')[0];
          urlTwo = `${urlOne}=${newSort}`;
          return `${urlTwo}&`;
        } else {
          return `${url}sortBy=${newSort}&`;
        }
      },
    });
    next();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: 'fail', message: 'bad request shop controller render' });
  }
};
exports.renderItemOverview = async (req, res, next) => {
const userIp=   req.headers['x-forwarded-for']?.split(',').shift()
  || req.socket?.remoteAddress;
console.log(userIp)
  try {
    if (!req.originalUrl.includes('?')) {
      lastPart = `${req.originalUrl}?`;
    } else {
      lastPart = req.originalUrl;
    }
    const hostUrl = `${req.protocol}://${req.get('host')}${lastPart}`;
    const color = req.query.color;
    const category = req.params.category.toUpperCase();
    const subCat = req.params.subCat.toUpperCase();
    const productNumber = req.params.productNumber;
    let productData = await Product.find({
      category: category,
      subCategory: subCat,
    });
    productData = productData.filter((el) => el.ProductID === productNumber);
    // console.log(productData[0].colors[0]);
    const secondColor = productData[0].colors[1];
    const thirdColor = productData[0].colors[2];
    // console.log(productNumber);
    let colorReq = await Product.find({
      // category: category,
      'colors.color': color,
    });
    let colorData = [];
    for (let index = 0; index < 4; index++) {
      const randomElement =
        colorReq[Math.floor(Math.random() * colorReq.length)];
      colorData.push(randomElement);
    }
    let colorImages;
    (function () {
      const product = productData[0];
      let colorReq = product.colors.filter((el) => el.color == color);
      colorImages = colorReq[0].images;
    })();
    console.log(colorImages);
    // console.log(colorData);
    res.status(200).render('item-overview', {
      product: productData[0],
      color,
      secondColor,
      thirdColor,
      productNumber,
      hostUrl,
      currentSize: req.query.size,
      colorData,
      colorImages,
    });
    next();
  } catch (error) {
    console.log(error);
  }
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
exports.addToCart = async (req, res, next) => {
  try {
    function makeid(length) {
      var result = '';
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    const reqData = req.body;
    const cartItem = {
      ProductID: reqData.ProductID,
      color: reqData.color,
      qty: reqData.qty,
      size: reqData.size,
      cartCode: makeid(12),
    };
    let all = await Product.find({});
    let price = Number(
      all.find((el) => el.ProductID == cartItem.ProductID).price
    );
    cartItem.price = price;
    console.log(cartItem);
    console.log(res.locals);
    const resData = await User.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $push: { userCart: cartItem } },
      { new: true }
    );
    // console.log(res.locals.user._id);
    // console.log(resData);

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'fail' });
  }
};
// { ProductID: "LCE-16633236" }
// Product.aggregate([
//   { $match: { category: 'BRA' } },
//   {
//     $group: {
//       _id: '$name',

//       total: { $sum: '$timesSold' },
//     },
//   },
// ]).then((x) => console.log(x));
