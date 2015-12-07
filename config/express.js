var express = require('express');
var session = require('express-session');
var SessionStore = require('express-mysql-session');
var glob = require('glob');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var flash = require('connect-flash');
var helpers = require('view-helpers');
var methodOverride = require('method-override');
var pkg = require('../package.json');

module.exports = function(app, passport, config) {
    var env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    app.set('views', config.root + '/app/views');
    app.set('view engine', 'ejs');
      // expose package.json to views
    app.use(function (req, res, next) {
        res.locals.pkg = pkg;
        res.locals.env = env;
        next();
    });

    app.use(favicon(config.root + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cookieParser());
    app.use(compress());
    app.use(express.static(config.root + '/public'));
    app.use(methodOverride());

    var options = {
        host: 'localhost',
        port: 3306,
        user: 'action',
        password: 'action',
        database: 'action'
    };

    var sessionStore = new SessionStore(options);
    app.use(session({
        key: 'session_cookie_name',
        secret: pkg.name,
        store: sessionStore,
        resave: true,
        saveUninitialized: true
    }));
    // 2 hours
    // var maxAgeMilli = 1000*60*60*2;
    // app.use(expressSession({
    //     cookie: { maxAge: maxAgeMilli },
    //     resave: true,
    //     saveUninitialized: true,
    //     secret: pkg.name,
    //     store: new mongoStore(cat_db)
    // }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());

    // should be declared after session and flash
    app.use(helpers(pkg.name));


    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function(controller) {
        require(controller)(app, passport);
    });

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    });

    console.log('Memory Usage', process.memoryUsage());
    setInterval(function() {
        if (typeof gc === 'function') {
            // https://simonmcmanus.wordpress.com/2013/01/03/forcing-garbage-collection-with-node-js-and-v8/
            queueScrape = true;
            spidering = true;
            gc();
            console.log('Memory ------> we ran gc()');
            queueScrape = false;
            spidering = false;
        }
        console.log('Memory Usage', process.memoryUsage());
    }, config.memory_usage_ms);

  // end of module.exports
};