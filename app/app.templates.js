$(function (app, $, _, undefined) {

    app.templates = {

        loadedTemplates: {},

        get: function (templateName, callback) {
            if (app.templates.loadedTemplates[templateName] !== undefined) {
                callback(app.templates.loadedTemplates[templateName]);
            }
            else {
                app.loader.inc();
                $.ajax({
                    url: 'templates/'+templateName+'.html',
                    type: "get",
                    dataType: "text",
                    success: function(response) {
                        app.templates.loadedTemplates[templateName] = _.template(response);
                        callback(app.templates.loadedTemplates[templateName]);
                        app.loader.dec();
                    },
                    error: function() {
                        console.error('Cannot load template: '+templateName);
                        callback(function () {
                            return '';
                        });
                        app.loader.dec();
                    }
                });
            }
        }
    }

}(window.app = window.app || {}, jQuery, _));