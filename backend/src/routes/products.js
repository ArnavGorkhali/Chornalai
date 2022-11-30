const express = require('express');
const productController = require('../controllers/product')

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);

module.exports = router;