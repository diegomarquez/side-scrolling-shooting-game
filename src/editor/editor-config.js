define(function(require) {
  var gb = require('gb');

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
      return { width: 12, height:12 };
    },

    getGridCellSize: function() {
      var gridSize = this.getGridSize();
      return { width: gb.canvas.width / gridSize.width, height:gb.canvas.height / gridSize.height };
    },

    getGameObjects: function() {
      var data = gb.goPool.getConfigurationTypes();

      data.splice(data.indexOf('ViewportOutline'), 1);
      data.splice(data.indexOf('ViewportGrid'), 1);

      return data;
    },

    getViewportLayers: function(viewport) {
      return viewport.getLayers()
                  .filter(function(layer) { 
                    return layer.name != this.getOutlineLayerName(); 
                  }.bind(this))
                  .map(function(layer) {
                    return layer.name;
                  })
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