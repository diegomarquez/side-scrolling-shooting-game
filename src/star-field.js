define(function(require) {	

	var starsBundle = require('stars-bundle');
	var world = require('world');
	var gb = require('gb');
	var util = require('util');

	var StarField = require("class").extend({
		init: function() {
			this.fastStars = null;
			this.normalStars = null;
			this.slowStars = null;
			this.extraSlowStars = null;
		},

		create: function() {
			// Add stars
			for (var i = 0; i < starsBundle.getStarCount(); i++) {
				var go = gb.add(starsBundle.getRandomStarType(), 'First', gb.getRandomStarsViewport());

				go.x = util.rand_f(0, world.getWidth());
				go.y = util.rand_f(0, world.getHeight());
			}

			this.fastStars = gb.viewports.get('FastStars');
			this.normalStars = gb.viewports.get('NormalStars');
			this.slowStars = gb.viewports.get('SlowStars'); 
			this.extraSlowStars = gb.viewports.get('ExtraSlowStars');
		},

		update: function(delta) {
			this.fastStars.x -= (150*delta);
			this.normalStars.x -= (120*delta);
			this.slowStars.x -= (100*delta);
			this.extraSlowStars.x -= (70*delta); 

			if (this.fastStars.x < -world.getWidth()-gb.canvas.width) 
				this.fastStars.x = gb.canvas.width;
			
			if (this.normalStars.x < -world.getWidth()-gb.canvas.width) 
				this.normalStars.x = gb.canvas.width;
			
			if (this.slowStars.x < -world.getWidth()-gb.canvas.width) 
				this.slowStars.x = gb.canvas.width;
			
			if (this.extraSlowStars.x < -world.getWidth()-gb.canvas.width) 
				this.extraSlowStars.x = gb.canvas.width;
		}
 	});

	return new StarField();
});