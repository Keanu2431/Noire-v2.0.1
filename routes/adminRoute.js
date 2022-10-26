const authController = require('./../controllers/authController');
const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
router
  .route('/dashboard')
  .get(
    authController.protect,
    authController.restrictTo('ADMIN'),
    adminController.renderDashboard
  );
module.exports = router;
