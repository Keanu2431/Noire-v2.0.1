const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();
// router.route('/:productID').get(shopController.getOneProduct);
router.route('/:category/:subCat?').get(shopController.renderPage);
router
  .route('/:category/:subCat/:productNumber')
  .get(shopController.renderItemOverview);

module.exports = router;
