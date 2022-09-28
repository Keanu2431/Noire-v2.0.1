const User = require('../model/userModel');

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
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'bad request path does not exist',
    });
  }
};
