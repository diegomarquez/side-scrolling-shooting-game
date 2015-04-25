define(function(require) {	
	var gb = require('gb');
	var world = require('world');
	var commonBundle = require('common-bundle');

	var GridBundle = require("bundle").extend({
		create: function(args) {	
			var step = require('editor-config').getGridCellSize();

			this.componentPool.createConfiguration("GridRenderer", commonBundle.getPathRendererPoolId())
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

						context.translate(0.5, 0.5);
						context.globalAlpha = 0.5;
						context.beginPath();
						
						for (var i = 1; i < Math.floor(step.width); i++) {
							var posX = step.width * i;
	        				
      				context.moveTo(posX, 0);
      				context.lineTo(posX, gb.canvas.height);	
						}

						for (var i = 1; i < Math.floor(step.height); i++) {
      				var posY = step.height * i;

      				context.moveTo(0, posY);
      				context.lineTo(gb.canvas.width, posY);	
						}

		        context.lineWidth = 1;
        		context.strokeStyle = "#f0ad4e";
        		context.stroke();        	
						context.closePath();
						
						context.restore();
					}
				});
			
			this.gameObjectPool.createConfiguration("ViewportGrid", commonBundle.getGameObjectPoolId())
				.args( { skipDebug: true } )
				.setRenderer('GridRenderer');
		},

		getGridId: function () {
			return "ViewportGrid";
		}
	});

	return new GridBundle();
});