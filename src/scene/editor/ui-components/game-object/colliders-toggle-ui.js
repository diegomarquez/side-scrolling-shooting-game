define(function(require) {
	var toggle = require('toggle');
	var gb = require('gb');
	var editorConfig = require('editor-config');

	var CollidersToggle = require('ui-component').extend({
		init: function() {},

		create: function() {      
			return toggle.create({
				id: 'colliders-toggle-button',
				on: 'Hide Colliders',
				off: 'Show Colliders',
				onChange: function() {					
					if ($(this).prop('checked')) {
						CollidersToggle.showAllColliderLayers();
						CollidersToggle.showAllColliderLayersGameObjects();
					} else {
						CollidersToggle.hideAllColliderLayers();
						CollidersToggle.hideAllColliderLayersGameObjects();
					}
				}
			});
		}
	});

	CollidersToggle.showAllColliderLayers = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {	
			viewports[i].showLayer(editorConfig.getGizmoMiddleLayerName());
			viewports[i].showLayer(editorConfig.getGizmoFrontLayerName());
		}
	}

	CollidersToggle.showAllColliderLayersGameObjects = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].getLayer(editorConfig.getGizmoMiddleLayerName()).showGameObjects();
			viewports[i].getLayer(editorConfig.getGizmoFrontLayerName()).showGameObjects();
		}
	}

	CollidersToggle.hideAllColliderLayers = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].hideLayer(editorConfig.getGizmoMiddleLayerName());
			viewports[i].hideLayer(editorConfig.getGizmoFrontLayerName());
		}
	}

	CollidersToggle.hideAllColliderLayersGameObjects = function() {
		var viewports = editorConfig.getViewports();

		for (var i = 0; i < viewports.length; i++) {
			viewports[i].getLayer(editorConfig.getGizmoMiddleLayerName()).hideGameObjects();
			viewports[i].getLayer(editorConfig.getGizmoFrontLayerName()).hideGameObjects();
		}
	}
	
	return CollidersToggle;
});