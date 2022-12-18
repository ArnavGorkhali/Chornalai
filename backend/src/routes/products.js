const express = require('express');
const productController = require('../controllers/product')

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);
router.get('/:productId', productController.getProductDetails);
router.delete('/delete/:productId', productController.deleteProducts);
router.put('/update/:productId', productController.updateProducts);

module.exports = router;