const User = require('../model/userModel');
// helper
exports.verifyUserAndPass = (user, pass) => {
  return allUsers.find((el) => {
    return (
      el.userName.toLowerCase() === user.toLowerCase() &&
      el.userPassword === pass
    );
  });
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
    const newUser = await User.create(req.body);
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
