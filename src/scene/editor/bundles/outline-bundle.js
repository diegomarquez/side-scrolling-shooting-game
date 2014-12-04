define(function(require) {	
	var gameObject = require("game-object"); 
	var pathRenderer = require("path-renderer");
	var editorConfig = require("editor-config");

	var viewports = require("viewports");

	var OutlineBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("path-renderer", pathRenderer);
			
			this.componentPool.createConfiguration("OutlineRenderer", 'path-renderer')
				.args({
					skipCache: true, 
					width: viewports.get(editorConfig.getMainViewportName()).width,
					height: viewports.get(editorConfig.getMainViewportName()).height,
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

			this.gameObjectPool.createDynamicPool("Outline", gameObject);
			
			this.gameObjectPool.createConfiguration("ViewportOutline", "Outline")
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