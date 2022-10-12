const Product = require('../model/productModel');

// handlers
exports.getAllProducts = async (req, res) => {
  try {
    const data = await Product.find({});
    res.status(200).json({
      status: 'success',
      results: data.length,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Bad Request',
      error: error,
    });
  }
};
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
    if (queryParams.category && queryParams.subCat == undefined) {
      // subCategory: sub
      console.log('show all in category');
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
    // by price,rating,recentcy
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
      } else if (sort == 'Newest') {
        data.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      } else if (sort == 'Oldest') {
        console.log(sort);
        data.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      }
    }
    if (Array(queryObj.sortBy).flat().length > 1) {
      res.status(400).json({
        status: 'Fail',
        message: 'Bad Request',
        err: "Can't sort by more than one query, needs one or less sortBy queries",
      });

      return;
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
      status: 'Fail',
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
// ({Product.aggregate([{ $match: { $name: 'Masquerade' } }]);})
// (async function () {
//   const res = await Product.aggregate([
//     { $match: { name: 'Masquerade' } },
//     { $set: { salePrice: '$price' * 0.8 } },
//   ]);
//   console.log(res);
// })();
const setSale = async function (query, salePerc, saleName) {
  const res = await Product.find(query);

  for (let i = 0; i < res.length; i++) {
    const element = res[i];
    console.log(
      await Product.findOneAndUpdate(
        { name: element.name },
        {
          $set: {
            salePrice: element.price * (1 - Number(salePerc) / 100),
            sale: `${salePerc}%`,
            saleName: saleName,
          },
        },
        { new: true }
      )
    );
  }
};
setSale({ subCategory: 'ROBES' }, 15, 'Fall Bash');
