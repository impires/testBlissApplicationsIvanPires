$( function(app, $, _, undefined) {

	app.models.Question = Backbone.Model.extend({

		idAttribute : 'id',

		initialize : function() {

		},

		url : function() {
			return config.baseUrl + '/questions/' + this.id;
		},

		parse : function(response) {
			return response;
		}
	});

}(window.app = window.app || {}, jQuery, _));
