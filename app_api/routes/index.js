var express = require('express');
var router = express.Router();
var ctrUser = require('../controllers/users');

// register user
router.post('/register', ctrUser.createUser);

// logout
router.get('/logout', function(req, res) {
    res.render('logout');
});
module.exports = router;