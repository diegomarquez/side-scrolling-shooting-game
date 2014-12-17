define(function(require) {	
	var commonBundle = require('common-bundle');
	var viewports = require("viewports");

	var OutlineBundle = require("bundle").extend({
		create: function(args) {		
			this.componentPool.createConfiguration("OutlineRenderer", commonBundle.getPathRendererPoolId())
				.args({
					skipCache: true, 
					width: viewports.get(require("editor-config").getMainViewportName()).width,
					height: viewports.get(require("editor-config").getMainViewportName()).height,
					name: 'outline',
					drawPath: function(context) {
						context.save();

						context.beginPath();
      			context.rect(0, 0, this.width, this.height);
        		context.lineWidth = 1 / this.parent.viewport.scaleX;
        		context.strokeStyle = "#4E91F0";

						context.closePath();
        		context.stroke();
						
						context.restore();
					}
				});

			this.gameObjectPool.createConfiguration("ViewportOutline", commonBundle.getGameObjectPoolId())
				.args({
					skipDebug: true,
					x:0, 
					y:0
				})
				.setRenderer('OutlineRenderer');
		},

		getOutlineId: function () {
			return "ViewportOutline";
		}
	});

	return new OutlineBundle();
});