define(function(require) {	
	var gb = require('gb');
	var world = require('world');
	var editorConfig = require('editor-config');

	var gameObject = require("game-object"); 
	var pathRenderer = require("path-renderer");

	var GridBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("path-renderer", pathRenderer);
			
			this.componentPool.createConfiguration("GridRenderer", 'path-renderer')
				.args({
					skipCache: true, 
					drawPath: function(context) {

						var xStep = gb.canvas.width / editorConfig.getGridSize().width;
						var yStep = gb.canvas.height / editorConfig.getGridSize().height;

						var i;

						context.save();
						context.beginPath();
						
						for (i = 0; i < xStep + 1; i++) {
							var posX = (xStep) * i;
	        				
	        				context.moveTo(posX, 0);
	        				context.lineTo(posX, gb.canvas.height);	
						}

						for (i = 0; i < yStep + 1; i++) {
	        				var posY = (yStep) * i;

	        				context.moveTo(0, posY);
	        				context.lineTo(gb.canvas.width, posY);	
						}

						context.closePath();
						context.restore();
						
		        		context.lineWidth = 1;
		        		context.strokeStyle = "#FFFFFF";
		        		context.stroke();        	
					}
				});

			this.gameObjectPool.createPool("Grid", gameObject, 1);
			
			this.gameObjectPool.createConfiguration("ViewportGrid", "Grid")
				.args( { skipDebug: true } )
				.setRenderer('GridRenderer');
		},

		getGridId: function () {
			return "ViewportGrid";
		}
	});

	return new GridBundle();
});