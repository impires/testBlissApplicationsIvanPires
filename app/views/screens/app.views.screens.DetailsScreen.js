$( function(app, $, _, undefined) {

	app.views.screens.DetailsScreen = app.views.screens.BaseScreen.extend({

		initialize : function(options) {
			this.question = options.question;
		},

		render : function() {
			var self = this;
			app.templates.get('screen.third', function(template) {
				self.$el.html(template());

				var vq = new app.views.Question({
					question : self.question,
					btnShare : true,
					btnDetails : false
				});

				self.$('.questionScreen').append(vq.$el);
			});
		}
	});

}(window.app = window.app || {}, jQuery, _)); 