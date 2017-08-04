$(function (app, $, _, undefined) {

    app.views.screens.BaseScreen = Backbone.View.extend({

        goBack: function () {
            if (this.previousScreen) {
                app.screen.open(this.previousScreen, false, false);
            }
        },

    });

}(window.app = window.app || {}, jQuery, _));