const cartController = require('./../controllers/cartController');
const express = require('express');
const router = express.Router();
router.get('/', cartController.renderCart);
module.exports = router;
