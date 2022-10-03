const express = require('express');
const accountController = require('./../controllers/accountController');
// const express = require('express');
// const authController = require('./../controllers/authController');
// const accountController = require('./../controllers/accountController');
// const User = require('../model/userModel');
const router = express.Router();
router.route('/update-profile').post(accountController.updateBasic);
module.exports = router;
