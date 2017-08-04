$(function (app, $, _, undefined) {

    _.extend(app, {

        models: {},
        collections:{
        	Base : {}
        },
        views:{
            screens: {}
        },

        /**
         * App basic initialization
         */
        initialize: function () {
            console.log('### Initialize ###');

            if (!config.debug){
                console.log = console.warn = console.error = function () {};
            }

            // Add event capabilities to the app object
            _.extend(app, Backbone.Events);

            // Device ready binding - bind the next events there
            document.addEventListener('deviceready', app.onDeviceReady, false);

            // Add first visible elements to the screen
            new app.views.Loader().$el.appendTo('body');
            app.screen.open(new app.views.screens.LoadingScreen(), true, false);
        },

        /**
         * Event handler for deviceready event
         */
        onDeviceReady: function () {
            console.log('### Device ready ###');

            // Global device events binding ------------------------------------
            // back button
            document.addEventListener('backbutton', function () {
                if (app.screen.current  &&  app.screen.current.previousScreen){
                    app.screen.current.goBack();
                }
                else {
                    console.log('No previous screen to return to. Exiting app...');
                    navigator.app.exitApp();
                }
            }, false);
        }


    });

    window.addEventListener('load', app.initialize);

}(window.app= window.app || {}, jQuery, _));