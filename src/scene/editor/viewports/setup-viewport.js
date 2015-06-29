define(function(require) {
	
	var gb = require('gb');
	var editorConfig = require('editor-config');
	var outlineBundle = require('outline-bundle');
	var viewportOutline = require('viewport-outline');

	var SetupViewport = require('class').extend({
		init: function() {},

		setup: function(viewportName) {      
			var viewport = gb.viewports.get(viewportName);

			viewport.addLayer(editorConfig.getDefaultLayerName());
			viewport.addLayer(editorConfig.getOutlineLayerName());

			viewport.addLayer(editorConfig.getGizmoCollidersBackLayerName());
			viewport.addLayer(editorConfig.getGizmoCollidersFrontLayerName());
			viewport.addLayer(editorConfig.getGizmoRotationBackLayerName());
			viewport.addLayer(editorConfig.getGizmoRotationFrontLayerName());
			viewport.addLayer(editorConfig.getGizmoScaleBackLayerName());
			viewport.addLayer(editorConfig.getGizmoScaleFrontLayerName());
			viewport.addLayer(editorConfig.getGizmoIconFrontLayerName());

			viewport.hideLayer(editorConfig.getGizmoCollidersBackLayerName());
			viewport.hideLayer(editorConfig.getGizmoCollidersFrontLayerName());
			viewport.hideLayer(editorConfig.getGizmoRotationBackLayerName());
			viewport.hideLayer(editorConfig.getGizmoRotationFrontLayerName());
			viewport.hideLayer(editorConfig.getGizmoScaleBackLayerName());
			viewport.hideLayer(editorConfig.getGizmoScaleFrontLayerName());

			return viewport;
		},

		addOutline: function(viewportName) {
			viewportOutline.add({
				viewportName: viewportName,
				gameObjectId: outlineBundle.getOutlineId(),
				updateGroup: editorConfig.getDefaultGroupName(),
				viewports: [
					{
						viewport: viewportName, 
						layer: editorConfig.getOutlineLayerName()
					}
				],
				gameObjectArguments: {
					viewport: gb.viewports.get(viewportName)
				} 
			});
		},

		removeOutline: function(viewportName) {
			viewportOutline.remove(viewportName);
		}
	});

	return new SetupViewport;
});