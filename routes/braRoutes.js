const express = require('express');
const braController = require('./../controllers/braController');

const router = express.Router();

router.route('/:cat/:subCat?/:PID?').get(braController.getProducts);

module.exports = router;
