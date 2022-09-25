const User = require('../model/userModel');
const Users = require('../model/userModel');
exports.verifyUserAndPass = (user, pass) => {
  return allUsers.find((el) => {
    return (
      el.userName.toLowerCase() === user.toLowerCase() &&
      el.userPassword === pass
    );
  });
};
exports.checkUsers = (user, email) => {
  return allUsers.find((el) => {
    // console.log(user, email);
    return (
      el.userName.toLowerCase() === user.toLowerCase() ||
      el.userEmail.toLowerCase() === email.toLowerCase()
    );
  });
};
exports.updateUsers = () => {
  fs.writeFileSync(
    `${__dirname}/dev-data/data/users/user-acc.json`,
    JSON.stringify(allUsers)
  );
};

exports.verifyUser = (req, res) => {
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
exports.createUser = async (req, res) => {
  try {
    // check DB to see if their is anyone with the submitted email || username
    const newUser = await Users.create(req.body);
    res.status(201).json({
      status: 'Success User Created',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'Fail', message: error });
  }
};
// edit user can be used to add anything you want
exports.editPassword = async (req, res) => {
  try {
    const newPassword = await User.findOneAndUpdate(
      req.body.userName,
      {
        password: req.body.newPassword,
      },
      { new: true }
    );
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newPassword,
      },
      body: req.body,
    });
  } catch (error) {
    res.status(400).json({
      status: 'bad request',
    });
  }
};
exports.deleteUser = (req, res) => {
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
exports.showUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: JSON.parse(
      fs.readFileSync(`${__dirname}./../dev-data/data/users/user-acc.json`)
    ),
  });
};
