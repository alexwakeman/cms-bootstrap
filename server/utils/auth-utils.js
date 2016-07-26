exports.auth = function (req, res, next) {
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress || false;
	ip = ip.split(', ')[0];

	// check logged in users to make sure their IP matches the one used to log in with
	if (req.session.auth && req.session.ip && req.session.ip === ip) {
		// user is authenticated
		next();
	}
	else {
		res.status(401).send('');
	}
};

exports.permission = function (req, res, next) {
	next();
};