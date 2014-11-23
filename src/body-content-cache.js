define(function(require) {
  require('jquery');

  var BodyContentCache = require("class").extend({
    init: function() {
      this.lastBodyContent = null;
      this.canvasContainer = null;
    },

    saveBodyContent: function() {
      this.lastBodyContent = $('body').children(':not(script)');
    },

    getLastBodyContent: function() {
      return this.lastBodyContent;
    },

    saveCanvasContainer: function() {
      this.canvasContainer = $('#main');
    },

    getCanvasContainer: function() {
      return this.canvasContainer;
    }
  });

  return new BodyContentCache();
});
