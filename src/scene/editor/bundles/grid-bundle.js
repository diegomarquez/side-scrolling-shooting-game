define(function(require) {	
	var gb = require('gb');
	var world = require('world');
	var editorConfig = require('editor-config');

	var gameObject = require("game-object"); 
	var pathRenderer = require("path-renderer");

	var step = editorConfig.getGridCellSize();

	var GridBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("path-renderer", pathRenderer);
			
			this.componentPool.createConfiguration("GridRenderer", 'path-renderer')
				.args({
					skipCache: true, 
					
					width: {
						_get: function() {
							return gb.canvas.width;
						}
					},

					height: {
						_get: function() {
							return gb.canvas.height;
						}
					},

					drawPath: function(context) {
						context.save();
						context.beginPath();
						
						for (var i = 1; i < step.width; i++) {
							var posX = step.width * i;
	        				
      				context.moveTo(posX, 0);
      				context.lineTo(posX, gb.canvas.height);	
						}

						for (var i = 1; i < step.height; i++) {
      				var posY = step.height * i;

      				context.moveTo(0, posY);
      				context.lineTo(gb.canvas.width, posY);	
						}

		        context.lineWidth = 0.3;
        		context.strokeStyle = "#f0ad4e";
        		context.stroke();        	
						context.closePath();
						
						context.restore();
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