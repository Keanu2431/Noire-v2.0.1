const cartController = require('./../controllers/cartController');
const express = require('express');
const router = express.Router();
router.get('/', cartController.renderCart);
router.delete('/remove-item', cartController.removeItem);
module.exports = router;
