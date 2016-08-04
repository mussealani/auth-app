var express = require('express');
var router = express.Router();
var ctrUser = require('../controllers/users');

// get register
router.get('/register', ctrUser.getRegisterForm);

// register user
router.post('/register', ctrUser.createUser);

// get login
router.get('/login', function(req, res) {
    res.render('login');
});

// logout
router.get('/logout', function(req, res) {
    res.render('logout');
});
module.exports = router;