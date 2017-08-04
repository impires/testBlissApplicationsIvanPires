$(function (app, $, _, undefined) {

    var switchScreen = function () {
        if (!app.loader.isBusy()  &&  app.screen.pending.length  &&  !app.screen.busy) {
            app.screen.busy = true;
            var transition = app.screen.pending.shift();
            if (transition.oldScreen != transition.newScreen){
                app.screen.transition(transition.oldScreen, transition.newScreen, transition.direction, function () {
                    app.screen.busy = false;
                    switchScreen();
                    app.screen.trigger('changed');
                });
            } else {
                app.screen.busy = false;
            }
        }
    };

    app.screen = {

        current: null,
        previous: null,
        pending: [],
        busy: false,

        open: function (screen, normalDirection, savePrevious) {
            app.loader.inc();
            normalDirection = normalDirection !== undefined ? normalDirection : true;
            savePrevious = savePrevious !== undefined ? savePrevious : true;
            if (savePrevious) {
                screen.previousScreen = app.screen.current;
            }

            app.screen.previous = app.screen.current;
            app.screen.current = screen;

            screen.render();

            app.screen.pending.push({
                oldScreen: app.screen.previous,
                newScreen: app.screen.current,
                direction: normalDirection,
            });
            app.loader.dec();
        },

        transition: function (oldScreen, newScreen, direction, callback) {
            var width = $(window).width();
            
            if (oldScreen){
                oldScreen.$el.css('top', - $('body').scrollTop());
                $('body').scrollTop(0);
            }

            newScreen.$el.addClass('screen')
            .css({
                left: (direction ? '100%' : '-100%'),
            })
            .appendTo('body');
            newScreen.delegateEvents();

            setTimeout(function () {
                $(newScreen.el)
                .css({
                    '-webkit-transition': 'left .5s',
                    left: '0%',
                });
                if (oldScreen) {
                    $(oldScreen.el)
                    .css({
                        '-webkit-transition': 'left .5s',
                        left: (direction ? '-100%' : '100%')
                    });
                }
                
                setTimeout( function () {
                    if (oldScreen) {
                        oldScreen.remove();
                    }

                    callback();
                }
                , 500);
            }, 0);
        },
    };

    _.extend(app.screen, Backbone.Events);
    app.loader.on('ready', switchScreen);

}(window.app = window.app || {}, jQuery, _));