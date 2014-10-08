define(function(require) {	
	var gameObject = require("game-object"); 
	var pathRenderer = require("path-renderer");

	var viewports = require('viewports');

	var OutlineBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("path-renderer", pathRenderer);
			
			this.componentPool.createConfiguration("OutlineRenderer", 'path-renderer')
				.args({
					skipCache: true, 
					width: viewports.get('Main').width,
					height: viewports.get('Main').height,
					name: 'outline',
					drawPath: function(context) {
						context.save();

						context.beginPath();
	        			context.rect(0, 0, this.width, this.height);
		        		context.lineWidth = 1 / this.parent.viewport.scaleX;
		        		context.strokeStyle = "#FFFFFF";
		        		context.stroke();        	
						context.closePath();
						
						context.restore();
					}
				});

			this.gameObjectPool.createDynamicPool("Outline", gameObject);
			
			this.gameObjectPool.createConfiguration("ViewportOutline", "Outline")
				.args({x:1, y:1})
				.setRenderer('OutlineRenderer');
		},

		getOutlineId: function () {
			return "ViewportOutline";
		}
	});

	return new OutlineBundle();
});