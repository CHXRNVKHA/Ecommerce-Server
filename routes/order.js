const express = require('express');
const {database} = require('../config/helpers');

const OrderController = require('../controllers/order-controller');
const OrderController = new OrderController();

const router = express.Router();

module.exports = router;