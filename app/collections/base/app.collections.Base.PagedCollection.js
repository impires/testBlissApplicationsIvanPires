$(function(app, $, _, undefined) {

    app.collections.Base.PagedCollection = Backbone.Collection.extend({
        fetch: function(options) {
            var self = this;
            this.offset = 0;
            this.limit = 10;
            options = options || {};

            if (!options.update) {
                this.reset();
            }

            Backbone.Collection.prototype.fetch.call(this, {
                success: function(collection, response) {
                    var max = response.length; // change when the API returns the number of total results
                    if (response.length <= max) {

                        var offset = 10; // change when the API returns the limit
                        var limit = 10; // change when the API returns the limit

                        while (offset <= max) { 
                            var aux = new Backbone.Collection();
                            aux.model = self.model;
                            self.offset = offset;
                            self.limit = limit;
                            aux.url = self.url();
                            aux.parse = self.parse;
                            app.loader.inc();
                            aux.fetch({
                                success: function(aux) {
                                    self.add(aux.toJSON(), {merge: true});
                                    app.loader.dec();
                                },
                                error: app.loader.dec
                            });
                            offset += limit;
                        }
                    }
                    if (options.success) {
                        options.success(self, response);
                    }
                },
                error: options.error
            });
        }


    });

}(window.app = window.app || {}, jQuery, undefined));