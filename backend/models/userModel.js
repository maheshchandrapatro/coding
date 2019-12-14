var mongoose = require('mongoose');
var userDetails = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
   
  },
  passwordSalt: {
    type: String,
    required: true,
   
  },

  
});


var User = mongoose.model('User', userDetails);
module.exports = User;