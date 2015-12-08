define([
    'jquery',
    'backbone'
], function($, Backbone) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            'login': 'showLoginView',
            '*actions': 'default'
        }
    });

    var currentView = null;

    var initialize = function(){

        var _app = window.AppData;
        var app_router = new AppRouter();
        var currentView = null;

        app_router.on('route:showLoginView', function () {
            // if (undefined !== this.currentView) {
            //     this.currentView.close();
            // }

            var me = this;
            try {
                require(['app_config', 'views/login_view'], function(appConfig, LoginView) {
                    var view = new LoginView({'app_config':appConfig});
                    $("#content").html(view.render().el);
                    //me.currentView = view;
                });
            }
            catch (e) {
                console.log(e.message);
            }
        });

        app_router.on('route:default', function () {
            // if (undefined !== this.currentView) {
            //     this.currentView.close();
            // }

            var me = this;
            try {
                require(['app_config', 'views/home_view'], function(appConfig, HomeView) {
                    var view = new HomeView({'app_config':appConfig});
                    $("#content").html(view.render().el);
                    //me.currentView = view;
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