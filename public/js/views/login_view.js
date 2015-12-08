define([
    'jquery',
    'backbone',
    'mustache',
    'text!templates/login_view_template.html'
], function($, Backbone, Mustache, mainTemplate) {
    var LoginView = Backbone.View.extend({
        options: null,
        initialize : function(options) {
            console.log('LoginView::initialize()');
            this.options = options;
            //this.el = options.el || 'div';
        },
        render: function(){
            console.log('LoginView::render()');
            $(this.el).html(Mustache.render(mainTemplate, {}));

            return this;
        }
    });

    return LoginView;
});