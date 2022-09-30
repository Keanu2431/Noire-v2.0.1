const express = require('express');
const productController = require('../controllers/productController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, productController.postNewProduct)
  .get(authController.protect, productController.getAllProducts);
router.route('/:category/:subCat?/').get(productController.getProducts);

module.exports = router;
