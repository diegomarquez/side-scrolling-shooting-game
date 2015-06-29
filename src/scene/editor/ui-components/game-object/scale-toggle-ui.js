define(function(require) {
	var toggle = require('toggle');
	var gb = require('gb');
	var editorConfig = require('editor-config');

	var ScaleToggle = require('ui-component').extend({
		init: function() {},

		create: function() {      
			return toggle.create({
				id: 'scales-toggle-button',
				on: 'Hide Scale Handles',
				off: 'Show Scale Handles',
				onChange: function() {
					if ($(this).prop('checked')) {
						ScaleToggle.showAllScaleLayers();
						ScaleToggle.showAllScaleLayersGameObjects();
					} else {
						ScaleToggle.hideAllScaleLayers();
						ScaleToggle.hideAllScaleLayersGameObjects();
					}
				}
			});
		}
	});

	ScaleToggle.showAllScaleLayers = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {  
			viewports[i].showLayer(editorConfig.getGizmoScaleBackLayerName());
			viewports[i].showLayer(editorConfig.getGizmoScaleFrontLayerName());
		}
	}

	ScaleToggle.showAllScaleLayersGameObjects = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].getLayer(editorConfig.getGizmoScaleBackLayerName()).showGameObjects();
			viewports[i].getLayer(editorConfig.getGizmoScaleFrontLayerName()).showGameObjects();
		}
	}

	ScaleToggle.hideAllScaleLayers = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].hideLayer(editorConfig.getGizmoScaleBackLayerName());
			viewports[i].hideLayer(editorConfig.getGizmoScaleFrontLayerName());
		}
	}

	ScaleToggle.hideAllScaleLayersGameObjects = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].getLayer(editorConfig.getGizmoScaleBackLayerName()).hideGameObjects();
			viewports[i].getLayer(editorConfig.getGizmoScaleFrontLayerName()).hideGameObjects();
		}
	}

	return ScaleToggle;
});