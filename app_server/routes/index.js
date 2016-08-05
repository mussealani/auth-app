var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/users');

// get homepage
router.get('/', ctrlUser.renderHomePage);

// get register fomr
router.get('/register', ctrlUser.getRegisterForm);

// get login form
// get login
router.get('/login', ctrlUser.getLoginForm);

module.exports = router;