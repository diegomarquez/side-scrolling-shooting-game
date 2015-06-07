define(function(require) {
	var GRID_WIDTH = 12;
	var GRID_HEIGHT = 12;
	var EDITOR_ONLY_VIEWPORTS = ['Grid'];
	var EDITOR_ONLY_LAYERS = ['Outline', 'GizmoCloseFront', 'GizmoFront', 'GizmoMiddle', 'GizmoBack', 'GizmoFarBack'];
	
	var editorOnlyComponents = null;
	var editorOnlyGameObjects = null;
	var colliderGizmoGameObjects = null;
	var rotationGizmoGameObjects = null;

	var cachedGridSize = { width: GRID_WIDTH, height: GRID_HEIGHT };
	var cachedGridCellSize = { width: null, height: null };

	var EditorConfig = require('class').extend({
		init: function() {},

		getDefaultLayerName: function() { return 'Front'; },
		getOutlineLayerName: function() { return EDITOR_ONLY_LAYERS[0]; },
		getGizmoCloseFrontLayerName: function() { return EDITOR_ONLY_LAYERS[1]; },
		getGizmoFrontLayerName: function() { return EDITOR_ONLY_LAYERS[2]; },
		getGizmoMiddleLayerName: function() { return EDITOR_ONLY_LAYERS[3]; },
		getGizmoBackLayerName: function() { return EDITOR_ONLY_LAYERS[4]; },
		getGizmoFarBackLayerName: function() { return EDITOR_ONLY_LAYERS[5]; },

		getDefaultFrontLayerName: function() { return 'Front'; },
		getDefaultMiddleLayerName: function() { return 'Middle'; },
		getDefaultBackLayerName: function() { return 'Back'; },

		getDefaultGroupName: function() { return 'First'; },
		
		getMainViewportName: function() { return 'Main'; },
		getGridViewportName: function() { return EDITOR_ONLY_VIEWPORTS[0]; },

		getColliderGizmoId: function() { return this.getEditorOnlyComponents()[0]; },

		getGridSize: function() {
			return cachedGridSize;
		},

		getGridCellSize: function() {
			if (cachedGridCellSize.width && cachedGridCellSize.height) {
				return cachedGridCellSize;
			}

			var gb = require('gb');

			cachedGridCellSize.width = gb.canvas.width / GRID_WIDTH;
			cachedGridCellSize.height = gb.canvas.height / GRID_HEIGHT;       

			return cachedGridCellSize;
		},

		getGridViewport: function() {
			return require('gb').viewports.get(this.getGridViewportName());
		},

		getGameObjects: function(options) {
			options = options || { filterChilds: true };

			var data = require('gb').goPool.getConfigurationTypes(options);

			var editorOnlyGameObjects = this.getEditorOnlyGameObjects();

			for (var i = 0; i < editorOnlyGameObjects.length; i++) {
				data.splice(data.indexOf(editorOnlyGameObjects[i]), 1);
			}

			return data;
		},

		isMainViewport: function(viewport) {
			return viewport.name == this.getMainViewportName();
		},

		isEditorGameObject: function(id) {
			return checkExistance(id, this.getEditorOnlyGameObjects());
		},

		isColliderGizmoGameObject: function(id) {
			return checkExistance(id, this.getColliderGizmoGameObjects());
		},

		isRotationGizmoGameObject: function(id) {
			return checkExistance(id, this.getRotationGizmoGameObjects());
		},

		isEditorComponent: function(id) {
			return checkExistance(id, this.getEditorOnlyComponents());
		},

		isEditorViewport: function(id) {
			return checkExistance(id, EDITOR_ONLY_VIEWPORTS);
		},

		getViewportLayers: function(viewport) {
			return viewport.getLayers()
				.filter(function(layer) { 
					return EDITOR_ONLY_LAYERS.indexOf(layer.name) == -1; 
				}.bind(this))
				.map(function(layer) {
					return layer.name;
				});
		},

		getViewportTopMostLayer: function(viewport) {
			var v;

			if (typeof viewport === 'string') {
				v = require('gb').viewports.get(viewport);
			} else {
				v = viewport;
			}

			var layers = v.getLayers().filter(function(layer) { 
				return EDITOR_ONLY_LAYERS.indexOf(layer.name) == -1; 
			}.bind(this));

			return layers.pop().name;
		},

		getViewports: function() {
			return require('gb').viewports.allAsArray().filter(function(viewport) { 
				return EDITOR_ONLY_VIEWPORTS.indexOf(viewport.name) == -1;
			}.bind(this));
		},

		getEditorOnlyComponents: function() {
			if (editorOnlyComponents) {
				return editorOnlyComponents;
			}

			var gizmoBundle = require('gizmo-bundle');
			var outlineBundle = require('outline-bundle');
			var gridBundle = require('grid-bundle');

			editorOnlyComponents = [
				gizmoBundle.getColliderGizmoId(),
				gizmoBundle.getIconGizmoId(),
				gizmoBundle.getRotationGizmoId()
			]

			return editorOnlyComponents;
		},

		getEditorOnlyGameObjects: function() {
			if (editorOnlyGameObjects) {
				return editorOnlyGameObjects;
			}

			var gizmoBundle = require('gizmo-bundle');
			var outlineBundle = require('outline-bundle');
			var gridBundle = require('grid-bundle');

			editorOnlyGameObjects = [
				outlineBundle.getOutlineId(), 
				gridBundle.getGridId(),
				gizmoBundle.getScrollStopperId(),
				gizmoBundle.getBossWarningId()
			]

			editorOnlyGameObjects = editorOnlyGameObjects.concat(this.getColliderGizmoGameObjects());
			editorOnlyGameObjects = editorOnlyGameObjects.concat(this.getRotationGizmoGameObjects());

			return editorOnlyGameObjects;     
		},

		getColliderGizmoGameObjects: function() {
			if (colliderGizmoGameObjects) {
				return colliderGizmoGameObjects;
			}

			var gizmoBundle = require('gizmo-bundle');

			colliderGizmoGameObjects = [
				gizmoBundle.getCircleHandleId(), 
				gizmoBundle.getPolygonHandleId(),
				gizmoBundle.getFixedPolygonHandleId(),
				gizmoBundle.getCircleDisplayId(),
				gizmoBundle.getPolygonDisplayId(),
				gizmoBundle.getFixedPolygonDisplayId()
			];

			return colliderGizmoGameObjects;
		},

		getRotationGizmoGameObjects: function() {
			if (rotationGizmoGameObjects) {
				return rotationGizmoGameObjects;
			}

			var gizmoBundle = require('gizmo-bundle');

			rotationGizmoGameObjects = [
				gizmoBundle.getRotationHandleId(),
				gizmoBundle.getRotationDisplayId()
			];

			return rotationGizmoGameObjects;
		}
	});

	var checkExistance = function(element, collection) {
		for (var i = 0; i < collection.length; i++) {
			if (element == collection[i]) {
				return true;
			}
		}

		return false;
	}

	return new EditorConfig();
});