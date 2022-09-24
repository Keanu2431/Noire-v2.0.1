const fs = require('fs');
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
exports.createUser = (req, res) => {
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
exports.editUser = (req, res) => {
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
    res.status(200).json({
      status: 'success',
      data: allUsers[index],
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
