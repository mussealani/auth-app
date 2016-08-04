var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

mongoose.model('User', userSchema);
// module.exports.createUser = function(newUser, callback) {
// 	bcrypt.genSalt(10, function (err, salt) {
// 		bcrypt.hash(newUser.password, salt, function (err, hash) {
// 			newUser.password = hash;
//             newUser.save(callback);
// 		});
// 	});
// }