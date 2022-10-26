const express = require('express');
const shopController = require('../controllers/shopController');
const authController = require('../controllers/authController');
const router = express.Router();
// router.route('/:productID').get(shopController.getOneProduct);
router.route('/:category/:subCat?').get(shopController.renderPage);
router
  .route('/:category/:subCat/:productNumber')
  .get(shopController.renderItemOverview);
router.route('/add-to-cart').post(shopController.addToCart);

module.exports = router;
