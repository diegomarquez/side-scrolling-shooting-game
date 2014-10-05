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
    }
  });

  return new EditorConfig();
});