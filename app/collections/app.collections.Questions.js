$( function(app, $, _, undefined) {

    app.collections.Questions = app.collections.Base.PagedCollection.extend({
    	
    	initialize : function(options) {
    		if(typeof options !== "undefined") {
    			this.filter = options.filter || "";
    		} else {
    			this.filter = "";
    		}
    		
    	},

        model : app.models.Question,

        url : function() {
            return app.url + '/questions?offset=' + this.offset + '&limit=' + this.limit + '&filter=' + this.filter;
        },

        parse: function(response) {
            return response;
        }
        
    });

}(window.app = window.app || {}, jQuery, _));