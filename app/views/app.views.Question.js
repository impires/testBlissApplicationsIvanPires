$( function(app, $, _, undefined) {

	app.views.Question = Backbone.View.extend({
		initialize : function(options) {
			this.question = options.question;
			this.shareBtn = options.btnShare;
			this.detailsBtn = options.btnDetails;
			this.render();
		},
		
		events : {
			"click #details_btn" : function() { this.viewDetails(this.question); },
			"click #back_btn" : "goBack"
		},
		
		goBack : function() {
			app.screen.open(new app.views.screens.ListScreen(), true, false);
		},
		
		viewDetails : function(quest) {
			app.screen.open(new app.views.screens.DetailsScreen({question : quest}), true, false);
		},
		
		render : function() {
			var self = this;

			app.templates.get('question', function(template) {

				self.$el.html(template({
					text : self.question.get('question'),
					image : self.question.get('thumb_url'),
					opt1 : self.question.get('choices')[0].choice + " (" + self.question.get('choices')[0].votes + ")",
					opt2 : self.question.get('choices')[1].choice + " (" + self.question.get('choices')[1].votes + ")",
					opt3 : self.question.get('choices')[2].choice + " (" + self.question.get('choices')[2].votes + ")",
					opt4 : self.question.get('choices')[3].choice + " (" + self.question.get('choices')[3].votes + ")",
					btnShare : self.shareBtn,
					btnDetails : self.detailsBtn
				}));

			});
		}
	});

}(window.app = window.app || {}, jQuery, _)); 