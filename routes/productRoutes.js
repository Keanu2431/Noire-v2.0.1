const express = require('express');
const productController = require('../controllers/productController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    // authController.restrictTo('ADMIN'),
    productController.postNewProduct
  )
  .get(
    authController.protect,
    // authController.restrictTo('ADMIN'),
    productController.getAllProducts
  );
router.route('/:category/:subCat?/').get(productController.getProducts);

module.exports = router;
