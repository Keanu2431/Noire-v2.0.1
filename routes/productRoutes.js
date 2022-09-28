const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router
  .route('/')
  .post(productController.postNewProduct)
  .get(productController.getAllProducts);
router
  .route('/:category/:subCat?/:productID?')
  .get(productController.getProducts);
module.exports = router;
