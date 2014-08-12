define(function(require) {	
	var gameObject = require('game-object'); 
	var largeStarRenderer = require('large-star-renderer');
	var mediumStarRenderer = require('medium-star-renderer');
	var smallStarRenderer = require('small-star-renderer');
	var microStarRenderer = require('micro-star-renderer');

	var starTypes = ['LargeStar', 'MediumStar', 'SmallStar', 'MicroStar'];

	var StarsBundle = require('bundle').extend({
		create: function(args) {	
			this.componentPool.createPool("large-star-renderer", largeStarRenderer);
			this.componentPool.createPool("medium-star-renderer", mediumStarRenderer);
			this.componentPool.createPool("small-star-renderer", smallStarRenderer);
			this.componentPool.createPool("micro-star-renderer", microStarRenderer);

			this.gameObjectPool.createPool("Star", gameObject, this.getStarCount());
			
			this.componentPool.createConfiguration("LargeStarRenderer", 'large-star-renderer');
			this.componentPool.createConfiguration("MediumStarRenderer", 'medium-star-renderer');
			this.componentPool.createConfiguration("SmallStarRenderer", 'small-star-renderer');
			this.componentPool.createConfiguration("MicroStarRenderer", 'micro-star-renderer');
			
			this.gameObjectPool.createConfiguration("LargeStar", "Star").setRenderer('LargeStarRenderer');
			this.gameObjectPool.createConfiguration("MediumStar", "Star").setRenderer('MediumStarRenderer');
			this.gameObjectPool.createConfiguration("SmallStar", "Star").setRenderer('SmallStarRenderer');
			this.gameObjectPool.createConfiguration("MicroStar", "Star").setRenderer('MicroStarRenderer');
		},

		getStarCount: function() {
			return 100;
		},

		getRandomStarType: function() {
			return starTypes[require('util').rand_i(0, starTypes.length-1)];
		}
	});

	return new StarsBundle();
});