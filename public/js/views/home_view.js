define([
    'jquery',
    'backbone',
    'mustache',
    'text!templates/home_view_template.html'
], function($, Backbone, Mustache, mainTemplate) {
    var HomeView = Backbone.View.extend({
        options: null,
        initialize : function(options) {
            console.log('HomeView::initialize()');
            //this.el = options.el || 'div';
        },
        render: function(){
            console.log('HomeView::render()');
            $(this.el).html(Mustache.render(mainTemplate, {}));

            return this;
        }
    });

    return HomeView;
});