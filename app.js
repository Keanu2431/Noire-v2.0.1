// look into glob npm for file iteration
// CORE MODULES
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
// HELPER FUNCS
const findSpecific = function (arr, pid) {
  return arr.find((el) => Number(el.PID) === Number(pid));
};
// const item = allBras.find((el) => {
//   return el.PID == 11205999;
// });
// DATA
const braletteData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/bras/bralette/bralette.json`)
);
const laceData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/bras/lace/lace.json`)
);
const straplessData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/bras/strapless/strapless.json`)
);
const pushupData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/bras/push-up/push-up.json`)
);
const allBras = [...braletteData, ...laceData, ...straplessData, ...pushupData];
// ROUTE HANDLERS
const getProducts = (req, res) => {
  let category = req.params.cat;
  let subCategory = req.params.subCat;
  let productID = req.params.PID * 1;
  // specific item
  if (category && subCategory && productID) {
    const currSubCategory = JSON.parse(
      fs.readFileSync(
        `${__dirname}/dev-data/data/${category}/${subCategory}/${subCategory}.json`
      )
    );
    res.status(200).json({
      status: 'success',
      results: 1,
      data: findSpecific(currSubCategory, productID),
    });
  }
  //all items from sub category
  else if (category && subCategory && !productID) {
    res.status(200).json({
      status: 'success',
      results: JSON.parse(
        fs.readFileSync(
          `${__dirname}/dev-data/data/${category}/${subCategory}/${subCategory}.json`
        )
      ).length,
      data: JSON.parse(
        fs.readFileSync(
          `${__dirname}/dev-data/data/${category}/${subCategory}/${subCategory}.json`
        )
      ),
    });
  } else if (category && !subCategory) {
    res.status(200).json({
      status: 'success',
      data: allBras,
    });
  }
};
// ROUTES
app.route('/products/:cat?/:subCat?/:PID?').get(getProducts);
// updating data
const editData = function (category) {
  braletteData.forEach((el) => {
    el.category = category;
  });
  fs.writeFileSync(
    `${__dirname}/dev-data/data/bras/${category}/${category}.json`,
    JSON.stringify(braletteData)
  );
};
// route handlers
const getAllBras = (res, req) => {
  res.status(200).json({
    status: 'success',
    results: braletteData.length,
  });
};
app.listen(port, () => {
  console.log(`running on port:${port}`);
});
