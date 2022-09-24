const fs = require('fs');
const Bras = require('../model/productModel');

// DATA
const braletteData = JSON.parse(
  fs.readFileSync(`${__dirname}./../dev-data/data/bras/bralette/bralette.json`)
);
const laceData = JSON.parse(
  fs.readFileSync(`${__dirname}./../dev-data/data/bras/lace/lace.json`)
);
const straplessData = JSON.parse(
  fs.readFileSync(
    `${__dirname}./../dev-data/data/bras/strapless/strapless.json`
  )
);
const pushupData = JSON.parse(
  fs.readFileSync(`${__dirname}./../dev-data/data/bras/push-up/push-up.json`)
);
const allBras = [...braletteData, ...laceData, ...straplessData, ...pushupData];
// USSER DATA
// const allUsers = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/users/user-acc.json`)
// );

//
//
findSpecific = function (arr, pid) {
  return arr.find((el) => Number(el.PID) === Number(pid));
};

// handlers
exports.getProducts = (req, res) => {
  let category = req.params.cat;
  let subCategory = req.params.subCat;
  let productID = req.params.PID * 1;
  // specific item
  if (category && subCategory && productID) {
    const currSubCategory = JSON.parse(
      fs.readFileSync(
        `${__dirname}./../dev-data/data/${category}/${subCategory}/${subCategory}.json`
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
          `${__dirname}./../dev-data/data/${category}/${subCategory}/${subCategory}.json`
        )
      ).length,
      data: JSON.parse(
        fs.readFileSync(
          `${__dirname}./../dev-data/data/${category}/${subCategory}/${subCategory}.json`
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

exports.createData = (req, res) => {};
