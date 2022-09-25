const express = require('express');

const userController = require('./../controllers/userController');

const router = express.Router();
router.route('/').get(userController.showUsers);
router.route('/register').post(userController.createUser);
router.route('/password-reset').patch(userController.editPassword);

module.exports = router;
