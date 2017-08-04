$(function (app, $, _, undefined) {

    app.views.screens.Fourth = app.views.screens.BaseScreen.extend({

        initialize: function () {

        },

        render: function () {
            var self = this;
            app.templates.get('screen.fourth', function (template) {
                self.$el.html(template());
            });
        }

    });

}(window.app = window.app || {}, jQuery, _));