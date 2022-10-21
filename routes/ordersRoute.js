const express = require('express');
const ordersController = require('../controllers/ordersController');

const router = express.Router();
router.get('/new-session', ordersController.getCheckoutSession);
module.exports = router;
// '/checkout'
