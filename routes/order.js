const express = require('express');

const OrderController = require('../controllers/order-controller');
const orderController = new OrderController();

const router = express.Router();


router.get('/', orderController.getAllOrders);

module.exports = router;