define(function(require) {
	var GRID_WIDTH = 12;
	var GRID_HEIGHT = 12;
	var EDITOR_ONLY_VIEWPORTS = ['Grid'];
	var EDITOR_ONLY_LAYERS = [
		'Outline', 
		'GizmoIconFront', 
		'GizmoCollidersBack', 
		'GizmoCollidersFront', 
		'GizmoRotationBack', 
		'GizmoRotationFront', 
		'GizmoScaleFront', 
		'GizmoScaleBack'
	];
	
	var editorOnlyComponents = null;
	var editorOnlyGameObjects = null;
	var colliderGizmoGameObjects = null;
	var rotationGizmoGameObjects = null;
	var scaleGizmoGameObjects = null;

	var cachedGridSize = { width: GRID_WIDTH, height: GRID_HEIGHT };
	var cachedGridCellSize = { width: null, height: null };

	var EditorConfig = require('class').extend({
		init: function() {},

		getDefaultLayerName: function() { return 'Front'; },
		getOutlineLayerName: function() { return EDITOR_ONLY_LAYERS[0]; },

		// Gizmo Layers
		getGizmoIconFrontLayerName: function() { return EDITOR_ONLY_LAYERS[1]; },
		
		getGizmoCollidersBackLayerName: function() { return EDITOR_ONLY_LAYERS[2]; },
		getGizmoCollidersFrontLayerName: function() { return EDITOR_ONLY_LAYERS[3]; },
		
		getGizmoRotationBackLayerName: function() { return EDITOR_ONLY_LAYERS[4]; },
		getGizmoRotationFrontLayerName: function() { return EDITOR_ONLY_LAYERS[5]; },
		
		getGizmoScaleBackLayerName: function() { return EDITOR_ONLY_LAYERS[6]; },
		getGizmoScaleFrontLayerName: function() { return EDITOR_ONLY_LAYERS[7]; },
		// Gizmo Layers

		getDefaultFrontLayerName: function() { return 'Front'; },
		getDefaultMiddleLayerName: function() { return 'Middle'; },
		getDefaultBackLayerName: function() { return 'Back'; },

		getDefaultGroupName: function() { return 'First'; },
		
		getMainViewportName: function() { return 'Main'; },
		getGridViewportName: function() { return EDITOR_ONLY_VIEWPORTS[0]; },

		getColliderGizmoId: function() { return this.getEditorOnlyComponents()[0]; },
		getIconGizmoId: function() { return this.getEditorOnlyComponents()[1]; },
		getRotatioGizmoId: function() { return this.getEditorOnlyComponents()[2]; },
		getScaleGizmoId: function() { return this.getEditorOnlyComponents()[3]; },

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

		isScaleGizmoGameObject: function(id) {
			return checkExistance(id, this.getScaleGizmoGameObjects());
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
				gizmoBundle.getRotationGizmoId(),
				gizmoBundle.getScaleGizmoId(),
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
			editorOnlyGameObjects = editorOnlyGameObjects.concat(this.getScaleGizmoGameObjects());

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
		},

		getScaleGizmoGameObjects: function() {
			if (scaleGizmoGameObjects) {
				return scaleGizmoGameObjects;
			}

			var gizmoBundle = require('gizmo-bundle');

			scaleGizmoGameObjects = [
				gizmoBundle.getScaleHandleId(),
				gizmoBundle.getScaleDisplayId()
			];

			return scaleGizmoGameObjects;
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