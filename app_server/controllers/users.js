var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.renderHomePage = function (req, res) {
    res.render('index');
};

module.exports.getRegisterForm = function(req, res) {
    res.render('register');
};

module.exports.getLoginForm = function(req, res) {
    res.render('login');
};