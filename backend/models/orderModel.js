var mongoose = require('mongoose');
var orderDetails = new mongoose.Schema({
  orderDueDate: {
    type: Date,
    required: true,
    trim: true
  },
  customerBuyerName: {
    type: String,
    required: true,
    trim: true
  },
  customerAddress: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: Number,
    required: true,
    trim: true
  },
  orderTotal: {
    type: Number,
    required: true,
    trim: true
  },
  createdDate: {
    type: Date,
    required: true,
    trim: true
  },
});


var Order = mongoose.model('Order', orderDetails);
module.exports = Order;