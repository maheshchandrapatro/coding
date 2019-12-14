var Order = require('../models/orderModel')
var moment = require("moment");
var today = moment().toDate();

exports.orderList = function (data, callback) {
    Order.find({}).then(result => {
        callback(null, result);
    }).catch(err => {
        callback(err, null)
    })
}
exports.newOrder = function (data, callback) {
    data.createdDate = today
    // data.orderDueDate = moment(data.orderDueDate).format('MM/DD/YYYY');
    Order.create(
        data
    ).then(result => {
        callback(null, result)
    }).catch(err => {
        callback(err, null)
    })
}
exports.editOrder = function (data, callback) {
    data.orderDueDate = moment(data.orderDueDate).format('MM/DD/YYYY');
    Order.findByIdAndUpdate(data._id, {
        $set: {
            orderDueDate: data.orderDueDate,
            customerBuyerName: data.customerBuyerName,
            customerAddress: data.customerAddress,
            customerPhone: data.customerPhone,
            orderTotal: data.orderTotal
        }
    }).then(result => {

        callback(null, result);
    }).catch(err => {

        callback(err, null)
    })
}
exports.deleteOrder = function (data, callback) {
    Order.findByIdAndRemove(data._id).then(result => {
        callback(null, result)
    }).catch(err => {
        callback(err, null);
    })
}
