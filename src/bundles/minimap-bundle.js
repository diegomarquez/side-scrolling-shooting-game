define(function(require) {	
	var gameObject = require("game-object"); 
	var pathRenderer = require("path-renderer");

	var viewports = require('viewports');

	var MinimapBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("path-renderer", pathRenderer);
			
			this.componentPool.createConfiguration("MinimapOutlineRenderer", 'path-renderer')
				.args({
					skipCache: true, 
					width: viewports.get('Main').width,
					height: viewports.get('Main').height,
					name: 'minimapOutline',
					drawPath: function(context) {
						context.save();

						context.beginPath();
	        			context.rect(0, 0, this.width, this.height);
		        		context.lineWidth = 15;
		        		context.strokeStyle = "#FFFFFF";
		        		context.stroke();        	
						context.closePath();
						
						context.restore();
					}
				});

			this.gameObjectPool.createPool("MinimapOutline", gameObject, 1);
			
			this.gameObjectPool.createConfiguration("Outline", "MinimapOutline")
				.args({x:1, y:1})
				.setRenderer('MinimapOutlineRenderer');
		},
	});

	return new MinimapBundle();
});