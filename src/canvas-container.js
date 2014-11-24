define(function(require) {
  require('jquery');

  var CanvasContainer = require("class").extend({
    init: function() {
      this.canvasContainer = null;
    },

    detachCanvas: function() {
      this.canvasContainer = $('#main').detach();

      this.canvasContainer.find(':not(canvas)').remove();
    },

    getCanvasContainer: function() {
      return this.canvasContainer[0];
    }
  });

  return new CanvasContainer();
});
