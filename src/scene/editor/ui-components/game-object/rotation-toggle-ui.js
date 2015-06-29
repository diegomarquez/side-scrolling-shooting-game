define(function(require) {
	var toggle = require('toggle');
	var gb = require('gb');
	var editorConfig = require('editor-config');

	var RotationToggle = require('ui-component').extend({
		init: function() {},

		create: function() {      
			return toggle.create({
				id: 'rotations-toggle-button',
				on: 'Hide Rotation Handles',
				off: 'Show Rotation Handles',
				onChange: function() {
					if ($(this).prop('checked')) {
						RotationToggle.showAllRotationLayers();
						RotationToggle.showAllRotationLayersGameObjects();
					} else {
						RotationToggle.hideAllRotationLayers();
						RotationToggle.hideAllRotationLayersGameObjects();
					}
				}
			});
		}
	});

	RotationToggle.showAllRotationLayers = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {  
			viewports[i].showLayer(editorConfig.getGizmoRotationBackLayerName());
			viewports[i].showLayer(editorConfig.getGizmoRotationFrontLayerName());
		}
	}

	RotationToggle.showAllRotationLayersGameObjects = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].getLayer(editorConfig.getGizmoRotationBackLayerName()).showGameObjects();
			viewports[i].getLayer(editorConfig.getGizmoRotationFrontLayerName()).showGameObjects();
		}
	}

	RotationToggle.hideAllRotationLayers = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].hideLayer(editorConfig.getGizmoRotationBackLayerName());
			viewports[i].hideLayer(editorConfig.getGizmoRotationFrontLayerName());
		}
	}

	RotationToggle.hideAllRotationLayersGameObjects = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].getLayer(editorConfig.getGizmoRotationBackLayerName()).hideGameObjects();
			viewports[i].getLayer(editorConfig.getGizmoRotationFrontLayerName()).hideGameObjects();
		}
	}

	return RotationToggle;
});