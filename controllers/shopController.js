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
  // if(req.originalUrl.slice)
  console.log(`lastpart:${lastPart}`);
  const hostUrl = `${req.protocol}://${req.get('host')}${lastPart}`;
  // const hostUrl = baseUrl;
  const sort = req.query.sortBy;
  console.log(req.originalUrl);
  console.log(`host:${hostUrl}`);
  // console.log(hostUrl);
  // console.log(params);
  // console.log(filter);
  // console.log(sort);
  // console.log(req.params);
  res.status(200).render('shop-template', { params, filter, sort, hostUrl });
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
