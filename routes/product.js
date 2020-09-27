const express = require('express');

const ProductController = require('../controllers/product-controller');
const productController = new ProductController();

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:prodId', productController.getProdById);
router.get('/category/:catName', productController.getProdsByCategory);

module.exports = router;