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
			viewports[i].showLayer(editorConfig.getGizmoFarBackLayerName());
			viewports[i].showLayer(editorConfig.getGizmoCloseFrontLayerName());
		}
	}

	RotationToggle.showAllRotationLayersGameObjects = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].getLayer(editorConfig.getGizmoFarBackLayerName()).showGameObjects();
			viewports[i].getLayer(editorConfig.getGizmoCloseFrontLayerName()).showGameObjects();
		}
	}

	RotationToggle.hideAllRotationLayers = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].hideLayer(editorConfig.getGizmoFarBackLayerName());
			viewports[i].hideLayer(editorConfig.getGizmoCloseFrontLayerName());
		}
	}

	RotationToggle.hideAllRotationLayersGameObjects = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].getLayer(editorConfig.getGizmoFarBackLayerName()).hideGameObjects();
			viewports[i].getLayer(editorConfig.getGizmoCloseFrontLayerName()).hideGameObjects();
		}
	}

	return RotationToggle;
});