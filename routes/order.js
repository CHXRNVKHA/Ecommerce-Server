const express = require('express');

const OrderController = require('../controllers/order-controller');
const OrderController = new OrderController();

const router = express.Router();


router.get('/', OrderController.getAllOrders);

module.exports = router;