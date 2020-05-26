const express = require('express');
const {database} = require('../config/helpers');

const ProductController = require('../controllers/product-controller');
const productController = new ProductController();

const router = express.Router();

router.get('/', productController.getAllProducts);

module.exports = router;