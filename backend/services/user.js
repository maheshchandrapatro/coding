var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config.js");
var moment = require("moment");
var User = require('../models/userModel')
var today = moment().toDate();

exports.register = function (data, callback) {
    var hashedPassword = bcrypt.hashSync(data.password, 8);
    data.passwordSalt = hashedPassword;
    data.createdOn = today;
    User.create(data).then(result => {
        var token = jwt.sign({
                id: result.insertId
            },
            config.secret, {
                expiresIn: 86400 // expires in 24 hours
            }
        );
        callback(null, token);
    }).catch(err => {
        callback(err, null);
    })
}

exports.login = function (data, callback) {
    User.findOne({
        userName: data.userName
    }).then(result => {

        if (data.password == result.password) {
            var token = jwt.sign({
                    id: result._id
                },
                config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                }
            );
            callback(null, {
                auth: true,
                token: token,
                data: result[0]
            });
        }else{
            callback({
                auth: false,
                token: null
            });
        }
    }).catch(err => {

        callback({
            auth: false,
            token: null
        });
    })
}