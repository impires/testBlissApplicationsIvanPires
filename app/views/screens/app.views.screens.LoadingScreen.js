$( function(app, $, _, undefined) {

	app.views.screens.LoadingScreen = app.views.screens.BaseScreen.extend({

		initialize : function() {

		},

		events : {
			"click #next_btn" : "openListScreen",
			"click #retry_btn" : "retry"
		},
		
		openListScreen : function() {
			app.screen.open(new app.views.screens.ListScreen(), true, false);
		},

		retry : function() {
			$("#retry_btn").hide();
			$(".loading_text").show();
			
			$.ajax({
				type : "GET",
				url : app.url + "/health",
				async : true,
				dataType : "json",
				success : function(result) {
					$(".loading_text").hide();
					console.log(result);
					if (result.status == "OK") {
						$("#next_btn").show();
					} else {
						$("#retry_btn").show();
					}

				}
			});
		},

		render : function() {
			var self = this;
			app.templates.get('screen.first', function(template) {
				self.$el.html(template());

				$.ajax({
					type : "GET",
					url : app.url + "/health",
					async : true,
					dataType : "json",
					success : function(result) {
						self.$(".loading_text").hide();
						console.log(result);
						if (result.status == "OK") {
							self.$("#next_btn").show();
						} else {
							self.$("#retry_btn").show();
						}

					}
				});

			});
		}
	});

}(window.app = window.app || {}, jQuery, _));
