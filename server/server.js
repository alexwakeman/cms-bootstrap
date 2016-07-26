var modLib = {}; // an object containing re-usable cross-app components
modLib.express = require('express');
modLib.app = modLib.express();
modLib.authChecker = require('./utils/auth-utils').auth;
var MongoDataAccess = require('./utils/mongo-data-access');
modLib.db = new MongoDataAccess();
modLib.router = modLib.express.Router();

var path = require('path');
var bodyParser = require('body-parser');
var RateLimit = require('express-rate-limit');
var helmet = require('helmet');

var port = process.env.PORT || 3000;
var dbAddr = 'mongodb://127.0.0.1:27017/qadb';

// security
// app.enable('trust proxy'); // only if you're behind a reverse proxy
var apiLimiter = new RateLimit({
	windowMs: 15*60*1000, // 15 minutes
	max: 100,
	delayMs: 0 // disabled
});
// only apply to requests that begin with /api/
modLib.app.use(['/login', '/api'], apiLimiter);
modLib.app.use(helmet());

// DB
modLib.db.connect({host: dbAddr});

// sessions
var session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	hours = 48,
	time = (3600000 * hours);

// session data is stored in 'sessions' collection in the default database
modLib.app.use(session({ // req.session is populated
	secret: '1745jfhtyRH1734hfijdncijidnsn',
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({
		url: dbAddr
	}),
	cookie: {
		path: '/',
		maxAge: new Date(Date.now() + time),
		httpOnly: true,
		domain: '.local'
	}
}));

// body parse
modLib.app.use(bodyParser.urlencoded({extended: false}));
modLib.app.use(bodyParser.json({limit: '50mb'}));

// ROUTING

// base routes
// modLib.app.all(['/api', '/cms'], function (req, res, next) {
// 	return req.session.auth ? next() : res.status(401).send('');
// });
modLib.app.use('/login', modLib.express.static(path.join(__dirname, '../dist/login/')));
modLib.app.use('/cms', modLib.express.static(path.join(__dirname, '../dist/')));
modLib.app.use('/cms/ng', (req, res) => res.redirect('/cms/'));

// api routes
var login = require('./routes/login')(modLib);
var users = require('./routes/users')(modLib);
modLib.app.use(login);
modLib.app.use('/api', users);

var server = modLib.app.listen(port, function () {
	var port = server.address().port;
	console.log('This express modLib.app is listening on port:' + port);
});