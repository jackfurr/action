define([
    'jquery',
    'backbone',
    'app_config'
], function($, Backbone, AppConfig) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            'login': 'showLoginView',
            '*actions': 'default'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter();

        app_router.on('route:showLoginView', function () {
            try {
                require(['views/login_view'], function(LoginView) {
                    var view = new LoginView({'app_config':AppConfig});
                    $("#content").html(view.render().el);
                });
            }
            catch (e) {
                console.log(e.message);
            }
        });

        app_router.on('route:default', function () {
            try {
                require(['views/home_view'], function(HomeView) {
                    var view = new HomeView({'app_config':AppConfig});
                    $("#content").html(view.render().el);
                });
            }
            catch (e) {
                console.log(e.message);
            }
        });

        Backbone.Events.on('navigate:back', function() {
            Backbone.history.history.back();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});