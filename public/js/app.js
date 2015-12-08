define([
    'jquery',
    'backbone',
    'bootstrap',
    'router'
], function($, Backbone, Bootstrap, Router){
    var initialize = function(){
        // Pass in our Router module and call it's initialize function
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});

