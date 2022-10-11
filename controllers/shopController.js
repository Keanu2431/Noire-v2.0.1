const { collection } = require('../model/productModel');
const Product = require('../model/productModel');

// rendering
exports.renderPage = async (req, res, next) => {
  const { category, subCat } = req.params;
  const params = { category, subCat };
  const filter = { color: req.query.color, size: req.query.size };
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
  if (filter.size) {
    const size = filter.size.toLowerCase();
    // // console.log(size);
    // let matchArray = [];

    // productData?.forEach((el) => {
    //   matchArray.push(el.sizesAvailable);
    // });

    // // pushing the proper element that need to be matched
    // matchArray = matchArray.filter((el) => el[size] > 0);
    // console.log(matchArray);

    // // clearing productData
    // productData = [];
    // // pushing in the matching productData
    // for (let index = 0; index < matchArray.length; index++) {
    //   const element = matchArray[index];
    //   const item = await Product.findOne({
    //     sizesAvailable: element,
    //   });
    //   productData.push(item);
    // }
    // productData = productData.flat();
    productData = await Product.find({
      'sizesAvailable.xl': { $gt: 0 },
      category: category,
    });
    res.status(200).json({ results: productData.length, productData });
  }

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

  // console.log(productData);
  // if(req.originalUrl.slice)
  // console.log(`lastpart:${lastPart}`);
  const hostUrl = `${req.protocol}://${req.get('host')}${lastPart}`;
  // const hostUrl = baseUrl;
  const sort = req.query.sortBy;
  // console.log(hostUrl);
  // console.log(params);
  // console.log(filter);
  // console.log(sort);
  // console.log(req.params);
  //
  // res
  //   .status(200)
  //   .render('shop-template', { params, filter, sort, hostUrl, productData });
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
