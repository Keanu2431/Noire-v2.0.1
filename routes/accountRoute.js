const express = require('express');
const accountController = require('./../controllers/accountController');
// const express = require('express');
const authController = require('./../controllers/authController');
// const accountController = require('./../controllers/accountController');
// const User = require('../model/userModel');
const router = express.Router();
router.route('/update-profile').post(
  authController.protect,

  accountController.updateBasic
);
router.route('/add-card').post(
  authController.protect,

  accountController.addCard
);
router.route('/delete-card').delete(
  authController.protect,

  accountController.deleteCard
);
router.route('/edit-card').post(
  authController.protect,

  accountController.editCard
);
router.route('/get-card/:index').get(
  authController.protect,

  accountController.getCard
);
router.route('/add-shipping').post(
  authController.protect,

  accountController.addShipping
);
router.route('/delete-shipping').delete(
  authController.protect,

  accountController.deleteShipping
);
router.route('/password-update').post(
  authController.protect,

  accountController.updatePassword
);
router.route('/pref-update').post(
  authController.protect,

  accountController.updatePref
);
module.exports = router;
