define(function(require) {
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
      return {width: 12, height:12};
    }
  });

  return new EditorConfig();
});