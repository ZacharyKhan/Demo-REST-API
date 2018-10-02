const express = require('express');
const router = express.Router();

// handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders have been fetched'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Order successfully created',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        message: 'Details for order with id: ' + orderId,
        id: orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        message: 'Deleted order with id: ' + orderId,
        id: orderId
    });
});

module.exports = router;
