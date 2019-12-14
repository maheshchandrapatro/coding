var express = require('express');
var router = express.Router();
var orderService = require('../services/order');
var VerifyToken = require('./verifyToken');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/getOrderList', VerifyToken , (req, res, next) => {
    orderService.orderList(req.body, (err, result) => {
        if (err) {
            res.send(new Error(err));
        } else {
            res.send(result);
        }
    })
})
router.post('/newOrder', VerifyToken,  (req, res, next) => {
    orderService.newOrder(req.body, (err, result) => {
        if (err) {
            res.send(new Error(err));
        } else {
            res.send(result);
        }
    })
})
router.put('/editOrder',VerifyToken,  (req, res, next) => {
    orderService.editOrder(req.body, (err, result) => {
        if (err) {
            res.send(new Error(err));
        } else {
            res.send(result);
        }
    })
})
router.post('/deleteOrder', VerifyToken, (req, res, next) => {
    orderService.deleteOrder(req.body, (err, result) => {
        if (err) {
            res.send(new Error(err));
        } else {
            res.send(result);
        }
    })
})

module.exports = router;
