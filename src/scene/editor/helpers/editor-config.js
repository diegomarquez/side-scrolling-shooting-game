define(function(require) {
  var gb = require('gb');

  var GRID_WIDTH = 12;
  var GRID_HEIGHT = 12;

  var EDITOR_ONLY_VIEWPORTS = ['Grid', 'Gizmo'];
  var EDITOR_ONLY_GAME_OBJECTS = ['ViewportOutline', 'ViewportGrid', 'CircleHandle', 'PolygonHandle'];

  var EditorConfig = require('class').extend({
    init: function() {},

    getDefaultLayerName: function() { return 'Front'; },
    getOutlineLayerName: function() { return 'Outline'; },

    getDefaultGroupName: function() { return 'First'; },
    
    getMainViewportName: function() { return 'Main'; },
    getGridViewportName: function() { return EDITOR_ONLY_VIEWPORTS[0]; },
    getGizmoViewportName: function() { return EDITOR_ONLY_VIEWPORTS[1]; },

    getGridSize: function() {
      return { width: GRID_WIDTH, height:GRID_HEIGHT };
    },

    getGridCellSize: function() {
      return { width: gb.canvas.width / GRID_WIDTH, height:gb.canvas.height / GRID_HEIGHT };
    },

    getGridViewport: function() {
    	return gb.viewports.get(this.getGridViewportName());
    },

    getGameObjects: function() {
      var data = gb.goPool.getConfigurationTypes();

      for (var i = 0; i < EDITOR_ONLY_GAME_OBJECTS.length; i++) {
      	data.splice(data.indexOf(EDITOR_ONLY_GAME_OBJECTS[i]), 1);
      };

      return data;
    },

    isMainViewport: function(viewport) {
    	return viewport.name == this.getMainViewportName();
    },

    getViewportLayers: function(viewport) {
      return viewport.getLayers()
	      .filter(function(layer) { 
	        return layer.name != this.getOutlineLayerName(); 
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
        return layer.name != this.getOutlineLayerName(); 
      }.bind(this));

      return layers.pop().name;
    },

    getViewports: function() {
      return gb.viewports.allAsArray().filter(function(viewport) { 
      	return EDITOR_ONLY_VIEWPORTS.indexOf(viewport.name) == -1;
      }.bind(this));
    }
  });

  return new EditorConfig();
});