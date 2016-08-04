var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.getRegisterForm = function(req, res) {
    res.render('register');
};

module.exports.createUser = function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);
    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        User.create({
            name: name,
            email: email,
            username: username,
            password: password
        }, function(err, user) {
            if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
            } else {
                console.log(user);
            }
        });
        req.flash('success_msg', 'You are registered and can now login!');
        res.redirect('/users/login');
    }
}