var comparePassword = require('../utils/crypto-utils').comparePassword;
module.exports = function (modLib) {
	modLib.router.route('/login')
		.post(function (req, res) {
			var input = req.body;
			var query = {
				email: input.email
			};

			modLib.db.findOneByObject('users', query, function (error, user) {
				if (error || !user) {
					res.status(401).send('Problem logging in - unknown user');
					return;
				}

				comparePassword(input.password, user.pw, function (error, isMatch) {
					if (error || !isMatch) {
						res.status(401).send('Problem logging in - password mismatch');
						return false;
					}
					else {
						var ip = req.headers['x-forwarded-for'] ||
							req.connection.remoteAddress ||
							req.socket.remoteAddress ||
							req.connection.socket.remoteAddress || '';
						ip = ip.split(', ')[0];
						// log the user in with a session
						req.session.ip = ip;
						req.session.isAuth = true;
						req.session.user = user;
						req.session.save(function (error) {
							// redirect to the appropriate CMS
							// based on the user
							if (error) {
								res.status(500).send('Could not save session.');
								return;
							}
							res.redirect('/cms/');
						});
					}
				});
			});
		});
	return modLib.router;
};

