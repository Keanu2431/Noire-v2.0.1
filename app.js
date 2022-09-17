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
const verifyUserAndPass = function (user, pass) {
  return allUsers.find((el) => {
    return (
      el.userName.toLowerCase() === user.toLowerCase() &&
      el.userPassword === pass
    );
  });
};
const checkUsers = (user, email) => {
  return allUsers.find((el) => {
    // console.log(user, email);
    return (
      el.userName.toLowerCase() === user.toLowerCase() ||
      el.userEmail.toLowerCase() === email.toLowerCase()
    );
  });
};
const updateUsers = () => {
  fs.writeFileSync(
    `${__dirname}/dev-data/data/users/user-acc.json`,
    JSON.stringify(allUsers)
  );
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
// USSER DATA
const allUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users/user-acc.json`)
);
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
const verifyUser = (req, res) => {
  const username = req.params.user;
  const password = req.params.password;
  if (username && password && verifyUserAndPass(username, password)) {
    res.status(200).json({
      status: 'success',
      data: verifyUserAndPass(username, password),
    });
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'No user with this matching username and password',
    });
  }
};
const createUser = (req, res) => {
  const newAcc = req.body;
  newAcc.userID = Math.floor(10000000 + Math.random() * 50000000);
  if (allUsers.find((el) => Number(el.userID) == Number(newAcc.userID))) {
    newAcc.userID = Math.floor(10000000 + Math.random() * 50000000);
  }
  if (allUsers.find((el) => Number(el.userID) == Number(newAcc.userID))) {
    newAcc.userID = Math.floor(10000000 + Math.random() * 50000000);
  }
  if (allUsers.find((el) => Number(el.userID) == Number(newAcc.userID))) {
    newAcc.userID = Math.floor(10000000 + Math.random() * 50000000);
  }
  if (!checkUsers(newAcc.userName, newAcc.userEmail)) {
    console.log('username isn`t taken and email isn not taken');
    // pushing new acc to array
    allUsers.push(newAcc);
    // rewriting the file
    updateUsers();
    // sending the response
    res.status(201).json({
      status: 'success',
      message: 'user registered',
      data: newAcc,
    });
  } else {
    res.status(400).json({
      status: 'failed',
      message: 'user name or email already exist',
    });
  }
};
// edit user can be used to add anything you want
const editUser = (req, res) => {
  const newInfo = req.body;
  if (!req.params.id) {
    res
      .status(400)
      .json({ status: 'failed', message: 'bad request, need user ID' });
    return;
  } else if (req.params.id) {
    const index = allUsers.findIndex((el) => el.userID == req.params.id);
    const { user } = allUsers[index];
    const data = req.body;
    // for (const key in data) {
    //   console.log(key, typeof user);
    //   console.log(`obj.${key} = ${data[key]}`);
    // }

    // const request = Object.entries(req.body);
    // request.forEach((element) => {
    //   console.log(element);
    //   const [key, value] = element;
    //   console.log(key, value);
    // });

    res.status(200).json({
      status: 'success',
      data: allUsers[index],
    });
  }
};
const deleteUser = (req, res) => {
  const acc = req.body;
  if (!acc.userID || !acc.userName || !acc.userPassword) return;
  const userIndex = allUsers.findIndex((el) => el.userID == acc.userID);
  if (userIndex == -1) {
    res.status(404).json({
      status: 'failed',
      message: 'Account Not Found',
    });
    return;
  }
  console.log(userIndex);
  allUsers.splice(userIndex, 1);
  updateUsers();
  res.status(404).json({
    status: 'success',
    message: 'user deleted',
  });
};
const createData = (req, res) => {};
// ROUTES
app.route('/products/:cat?/:subCat?/:PID?').get(getProducts);
// this route is for basic user info
app
  .route('/users/:user?/:password?/:id?')
  .get(verifyUser)
  .post(createUser)
  .delete(deleteUser)
  .patch(editUser)
  .put(createData);
// app.route('/users/register').post(createUser);
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
app.listen(port, () => {
  console.log(`running on port:${port}`);
});
