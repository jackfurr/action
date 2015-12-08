requirejs.config({
	paths: {
        'baseUrl': './js',
        'vendor': 'vendor',
        'templates': 'templates',
        'jquery': 'vendor/jquery/jquery-2.1.4.min',
        'backbone': 'vendor/backbone/backbone-min',
        'bootstrap': 'vendor/bootstrap/bootstrap-3.3.6.min',
        'underscore': 'vendor/underscore/underscore-1.8.3-min',
        'text': 'vendor/text/text-2.0.14',
        'mustache': 'vendor/mustache/mustache-2.2.0.min'
	},
    waitSeconds: 0,
	shim: {
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'text': {
            deps: ['backbone']
        }
    }
});

require([
    'app'
], function(App) {
        App.initialize();
    }
);
