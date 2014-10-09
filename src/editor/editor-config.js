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

    getViewportLayers: function(viewport) {
      return viewport.getLayers()
                  .filter(function(layer) { 
                    return layer.name != this.getOutlineLayerName(); 
                  }.bind(this))
                  .map(function(layer) {
                    return layer.name;
                  })
    },

    getViewports: function() {
      return gb.viewports.allAsArray().filter(function(viewport) { 
        return viewport.name != this.getGridViewportName()
      }.bind(this));
    }
  });

  return new EditorConfig();
});