const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();
// router.route('/:productID').get(shopController.getOneProduct);
router.route('/:category/:subCat?').get(shopController.renderPage);

module.exports = router;
