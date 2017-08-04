$( function(app, $, _, undefined) {

	app.views.screens.ListScreen = app.views.screens.BaseScreen.extend({

		initialize : function() {
			this.questions = new app.collections.Questions();

			app.loader.inc();
			this.questions.fetch({
				success : app.loader.dec,
				error : app.loader.dec
			});
			this.questions.on('add change reset remove', this.render, this);
		},
		
		events : {
			"click #search_btn" : "search"
		},
		
		search : function() {
			this.questions = new app.collections.Questions({filter : $("#search_input").val()});

			app.loader.inc();
			this.questions.fetch({
				success : app.loader.dec,
				error : app.loader.dec
			});
		},

		render : function() {
			var self = this;
			app.templates.get('screen.second', function(template) {
				self.$el.html(template());

				self.$('.questions').html("");

				self.questions.each(function(question) {

					console.log(question.attributes);

					var vq = new app.views.Question({
						question : question,
						btnShare : false,
						btnDetails : true
					});

					self.$('.questions').append(vq.$el);
				});

			});
		}
	});

}(window.app = window.app || {}, jQuery, _));
