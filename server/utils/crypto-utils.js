var bcrypt = require('bcrypt');

exports.cryptPassword = function (password, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return callback(err);
		else {
			bcrypt.hash(password, salt, function (err, hash) {
				return callback(err, hash);
			});
		}
	});
};

exports.comparePassword = function (password, userPassword, callback) {
	bcrypt.compare(password, userPassword, function (err, isPasswordMatch) {
		if (err) return callback(err);
		else return callback(null, isPasswordMatch);
	});
};

