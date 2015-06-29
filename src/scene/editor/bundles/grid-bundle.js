define(function(require) {  
	var gb = require('gb');
	var world = require('world');
	var commonBundle = require('common-bundle');

	var offsetX = 0;
	var offsetY = 0;
	var screenOffsetX = 0;
	var screenOffsetY = 0;

	var initCanvasWidth = gb.canvas.width;
	var initCanvasHeight = gb.canvas.height;

	var GridBundle = require("bundle").extend({
		create: function(args) {  
			var step = require('editor-config').getGridCellSize();		
			var dashPattern = [2];

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

						context.translate(0.5 - offsetX, 0.5 - offsetY);
						context.globalAlpha = 0.5;
						context.lineWidth = 1;
						context.strokeStyle = "#FFFFFF";
						context.setLineDash(dashPattern);

						context.beginPath();
				
						var count = 0;

						while (true) {
							var posX = step.width * count;
							count++;

							if (posX > gb.canvas.width + step.width)
								break;

							context.moveTo(posX, 0);
							context.lineTo(posX, gb.canvas.height + step.height);
						}

						count = 0;

						while (true) {
							var posY = step.height * count;
							count++;

							if (posY > gb.canvas.height + step.height)
								break;

							context.moveTo(0, posY);
							context.lineTo(gb.canvas.width + step.width, posY);
						}

						context.stroke();
						context.closePath();
						context.restore();

						context.save();

						context.translate(-screenOffsetX, -screenOffsetY);
						context.lineWidth = 2;
						context.strokeStyle = "#f0ad4e";

						context.beginPath();
				
						count = 0;

						while (true) {
							posX = initCanvasWidth * count;
							count++;

							if (posX > gb.canvas.width + initCanvasWidth)
								break;

							context.moveTo(posX, 0);
							context.lineTo(posX, gb.canvas.height + initCanvasHeight);
						}

						count = 0;

						while (true) {
							posY = initCanvasHeight * count;
							count++;

							if (posY > gb.canvas.height + initCanvasHeight)
								break;
						
							context.moveTo(0, posY);
							context.lineTo(gb.canvas.width + initCanvasWidth, posY);
						}

						context.stroke();
						context.closePath();

						context.restore();						
					}
				});
			
			this.gameObjectPool.createConfiguration("ViewportGrid", commonBundle.getGameObjectPoolId())
				.args( { skipDebug: true } )
				.setRenderer('GridRenderer');
		},

		setOffsetX: function(value) {
			offsetX = value % require('editor-config').getGridCellSize().width;
			screenOffsetY = value % initCanvasWidth;
		},

		setOffsetY: function(value) {
			offsetY = value % require('editor-config').getGridCellSize().height;
			screenOffsetY = value % initCanvasHeight;
		},

		getGridId: function () {
			return "ViewportGrid";
		}
	});

	return new GridBundle();
});