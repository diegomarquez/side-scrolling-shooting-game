define(function(require) {
  var gb = require('gb');

  var GRID_WIDTH = 12;
  var GRID_HEIGHT = 12;

  var EditorConfig = require('class').extend({
    init: function() {},

    getDefaultLayerName: function() {
      return 'Front';
    },

    getDefaultGroupName: function() {
      return 'First';
    },

    getOutlineLayerName: function() {
      return 'Outline';
    },

    getMainViewportName: function() {
      return 'Main';
    },

    getGridViewportName: function() {
      return 'Grid';
    },

    getGridLayerName: function() {
      return 'Front';
    },

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

      data.splice(data.indexOf('ViewportOutline'), 1);
      data.splice(data.indexOf('ViewportGrid'), 1);

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
        return viewport.name != this.getGridViewportName()
      }.bind(this));
    }
  });

  return new EditorConfig();
});