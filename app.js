var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    mongo = require('mongodb'),
    logger = require('morgan'),
    mongoose = require('mongoose');
    require('./app_api/models/db');

// creates
var routes = require('./app_server/routes/index'),
    usersApi = require('./app_api/routes/index');
    // users = require('./app_server/routes/users');

// init app
var app = express();

// logger
app.use(logger('dev'));

// view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'layout',
    layoutsDir: './app_server/views/layouts'
}));
app.set('view engine', 'handlebars');

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// passport session
app.use(passport.initialize());
app.use(passport.session());

// express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split(',');
        var root = namespace.shift();
        var formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace + ']';
        };
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// connect flash
app.use(flash());

// global vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', routes);
// app.use('/users', users);
app.use('/api', usersApi);

// set the port
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
	console.log('Server started on port: ' + app.get('port'))
});