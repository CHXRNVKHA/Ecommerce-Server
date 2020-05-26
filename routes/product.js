const express = require('express');
const {database} = require('../config/helpers');

const ProductController = require('');
const productController = new ProductController();

const router = express.Router();

router.get('/', productController.getAll);

module.exports = router;