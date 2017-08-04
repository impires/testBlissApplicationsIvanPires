$(function (app, $, _, undefined) {
    
    app.views.Loader = Backbone.View.extend({
        
        initialize: function () {
            this.render();
        },
        
        render: function () {
            var self = this;
            app.templates.get('loader', function (template) {
                self.$el
                .html(template())
                .addClass('loader');
            });
        }
        
    });
    
}(window.app = window.app || {}, jQuery, _));