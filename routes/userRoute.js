const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();
router.route('/').get(authController.protect, userController.getAllUsers);
router.route('/login').post(userController.loginAuth);
router.route('/register').post(userController.createUser);
router.route('/password-reset').patch(userController.editPassword);

module.exports = router;
