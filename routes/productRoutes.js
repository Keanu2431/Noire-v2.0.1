const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.route('/').post(productController.postNewProduct);
router.route('/:category/:subCat?').get(productController.getProducts);
module.exports = router;
