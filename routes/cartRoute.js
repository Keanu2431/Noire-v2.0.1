const cartController = require('./../controllers/cartController');
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
router.get('/', authController.protect, cartController.renderCart);
router.delete(
  '/remove-item',
  authController.protect,
  cartController.removeItem
);
module.exports = router;
