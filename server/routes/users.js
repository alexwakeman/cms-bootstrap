var cryptPassword = require('../utils/crypto-utils').cryptPassword;

module.exports = function (modLib) {
	modLib.router.route('/users/current')
		.get(modLib.authChecker, function (req, res) {
			res.set('Content-Type', 'application/json');
			delete req.session.user.pw;
			res.send(req.session.user);
		});

	modLib.router.route('/users/logout')
		.get(modLib.authChecker, function (req, res) {
			req.session.destroy(function (err) {
				if (err) {
					res.status(200).send('Problem logging user out.');
				}
				res.status(200).send('logged out');
			});
		});

	modLib.router.route('/users/:id?')
		.get(modLib.authChecker, function (req, res) {
			var id = req.params.id;
			if (id) {
				modLib.db.findById('users', id, function (error, data) {
					if (error) {
						res.status(500).send(error.message);
					}
					res.set('Content-Type', 'application/json');
					delete data.pw;
					res.send(data);
				});
			}
			else {
				modLib.db.findAll('users', function (error, data) {
					if (error) {
						res.status(500).send(error.message);
					}
					res.set('Content-Type', 'application/json');
					res.send(data);
				});
			}
		})
		.post(modLib.authChecker, function (req, res) {
			var input = req.body;
			cryptPassword(input.password, function (error, pw) {
				if (error) {
					res.status(500).send(error.message);
					return;
				}
				input.pw = pw;
				delete input.password; // must delete plain text version of password
				modLib.db.addEntry('users', input);
				res.status(200).send('');
			});
		})
		.put(modLib.authChecker, function (req, res) {
			var input = req.body;
			cryptPassword(input.password, function (error, pw) {
				if (error) {
					res.status(500).send(error.message);
					return;
				}
				input.pw = pw;
				delete input.password; // must delete plain text version of password
				modLib.db.updateEntry('users', req.params.id, input, function (error) {
					if (error) {
						res.status(500).send(error.message);
						return;
					}
					res.status(200).send('');
				});
			});
		})
		.delete(modLib.authChecker, function (req, res) {
			modLib.db.removeEntry('users', req.params.id, function (error) {
				if (error) {
					res.status(500).send(error.message);
				}
				res.status(200).send('');
			});
		});

	return modLib.router;
};

