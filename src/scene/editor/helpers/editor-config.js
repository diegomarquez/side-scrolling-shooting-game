define(function(require) {
  var gb = require('gb');
  var util = require('util');
  
  var gizmoHandleBundle = require('gizmo-bundle');
  var outlineBundle = require('outline-bundle');
  var gridBundle = require('grid-bundle');

  var GRID_WIDTH = 12;
  var GRID_HEIGHT = 12;

  var EDITOR_ONLY_VIEWPORTS = ['Grid'];

  var EDITOR_ONLY_LAYERS = ['Outline', 'GizmoFront', 'GizmoBack']

  var EDITOR_ONLY_COMPONENTS = [
  	gizmoHandleBundle.getColliderGizmoId()
  ]

  var EDITOR_ONLY_GAME_OBJECTS = [
  	outlineBundle.getOutlineId(), 
  	gridBundle.getGridId(), 
  	gizmoHandleBundle.getCircleHandleId(), 
  	gizmoHandleBundle.getPolygonHandleId(),
  	gizmoHandleBundle.getFixedPolygonHandleId(),
  	gizmoHandleBundle.getCircleDisplayId(),
		gizmoHandleBundle.getPolygonDisplayId(),
		gizmoHandleBundle.getFixedPolygonDisplayId()
  ];

  var EditorConfig = require('class').extend({
    init: function() {},

    getDefaultLayerName: function() { return 'Front'; },
    getOutlineLayerName: function() { return EDITOR_ONLY_LAYERS[0]; },
    getGizmoFrontLayerName: function() { return EDITOR_ONLY_LAYERS[1]; },
    getGizmoBackLayerName: function() { return EDITOR_ONLY_LAYERS[2]; },

    getDefaultFrontLayerName: function() { return 'Front'; },
    getDefaultBackLayerName: function() { return 'Back'; },

    getDefaultGroupName: function() { return 'First'; },
    
    getMainViewportName: function() { return 'Main'; },
    getGridViewportName: function() { return EDITOR_ONLY_VIEWPORTS[0]; },

    getColliderGizmoId: function() { return EDITOR_ONLY_COMPONENTS[0]; },

    getGridSize: function() {
      return { width: GRID_WIDTH, height:GRID_HEIGHT };
    },

    getGridCellSize: function() {
      return { width: gb.canvas.width / GRID_WIDTH, height:gb.canvas.height / GRID_HEIGHT };
    },

    getGridViewport: function() {
    	return gb.viewports.get(this.getGridViewportName());
    },

    getGameObjects: function(options) {
    	options = options || {filterChilds: true};

      var data = gb.goPool.getConfigurationTypes(options);

      for (var i = 0; i < EDITOR_ONLY_GAME_OBJECTS.length; i++) {
      	data.splice(data.indexOf(EDITOR_ONLY_GAME_OBJECTS[i]), 1);
      }

      return data;
    },

    getGameObjectsNesting: function() {
      var data = this.getGameObjects();

      var result = [];

      for (var i = 0; i < data.length; i++) {
      	result.push(this.getGameObjectNesting(data[i]));
      }

      return result;
    },

    getGameObjectNesting: function(configurationId) {
    	var configuration = gb.goPool.getConfigurationObject(configurationId);

    	var result = {
    		id: configurationId,
    	};

    	if (configuration.childs) {
    		result.children = []

    		for (var i = 0; i < configuration.childs.length; i++) {
    			result.children.push(this.getGameObjectNesting(configuration.childs[i].childId));
    		}
    	}

    	return result;
    },

    isMainViewport: function(viewport) {
    	return viewport.name == this.getMainViewportName();
    },

    isEditorGameObject: function(id) {
    	return checkExistance(id, EDITOR_ONLY_GAME_OBJECTS);
    },

    isEditorComponent: function(id) {
    	return checkExistance(id, EDITOR_ONLY_COMPONENTS);
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
        v = gb.viewports.get(viewport);
      } else {
        v = viewport;
      }

      var layers = v.getLayers().filter(function(layer) { 
        return EDITOR_ONLY_LAYERS.indexOf(layer.name) == -1; 
      }.bind(this));

      return layers.pop().name;
    },

    getViewports: function() {
      return gb.viewports.allAsArray().filter(function(viewport) { 
      	return EDITOR_ONLY_VIEWPORTS.indexOf(viewport.name) == -1;
      }.bind(this));
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