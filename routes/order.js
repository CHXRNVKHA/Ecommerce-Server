const express = require('express');

const OrderController = require('../controllers/order-controller');
const orderController = new OrderController();

const router = express.Router();


router.get('/', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrderById);

router.post('/add', orderController.addOrder);
router.post('/payment', (req, res) => {
    setTimeout(() => {
        res.status(200).json({success: true})
    }, 3000);
});

module.exports = router;