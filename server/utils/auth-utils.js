/**
 *
 * @param isOn is a boolean to configure whether and auth check is required for requests by default (for development purposes).
 * 			pass `true` to ensure each request is checked against session security data.
 * 			`false` allows all data to be sent from server with or without a session.
 * @returns {Function}
 */
exports.auth = function(isOn) {
	return function (req, res, next) {
		var ip = req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress || false;
		ip = ip.split(', ')[0];

		if (isOn === false) {
			return next();
		}
		// check logged in users to make sure their IP matches the one used to log in with
		if (req.session.isAuth && req.session.ip && req.session.ip === ip) {
			// user is authenticated
			next();
		}
		else {
			res.status(401).send('');
		}
	}
};


exports.permission = function (req, res, next) {
	next();
};