$(function (app, $, _, undefined) {
    
    var update = function () {
        if (app.loader.isBusy()) {
            $('body').addClass('loading');
        }
        else{
            $('body').removeClass('loading');
        }
    };
    
    app.loader = {
                
        // Number of pending tasks
        waiting: [],
        
        inc: function (message) {
            message = message || 'Please wait...',
            app.loader.waiting.push(message);
            if (app.loader.waiting.length == 1) {
                update();
            }
            app.loader.trigger('busy');
            app.loader.trigger('changed');
        },
        
        dec: function () {
            app.loader.waiting.pop();
            if (app.loader.waiting.length == 0) {
                app.loader.trigger('ready');
                update();
            }
            app.loader.trigger('changed');
        },
        
        getMessage: function () {
            if (this.waiting.length) return app.loader.waiting[app.loader.waiting.length-1] ;
            return '';
        },
        
        isBusy: function () {
            return this.waiting.length;
        }
        
    };
    
    _.extend(app.loader, Backbone.Events);
    
}(window.app = window.app || {}, jQuery, _));