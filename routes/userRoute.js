const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();
router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('ADMIN'),
    userController.getAllUsers
  );
router.route('/login').post(userController.loginAuth);
router.route('/register').post(userController.createUser);
router.route('/password-reset').patch(userController.editPassword);
router.route('/cookie').post(async function (req, res, next) {
  console.log(req);
});
router.route('/logout').get(userController.logout);

module.exports = router;
