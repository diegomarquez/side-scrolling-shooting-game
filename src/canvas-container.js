define(function(require) {
  require('jquery');

  var CanvasContainer = require("class").extend({
    init: function() {
      this.canvasContainer = $('#main');
    },

    detachCanvas: function() {
      this.canvasContainer.detach();
      this.canvasContainer.find(':not(canvas,#activity-display,#activity-display *)').remove();
    },

    getCanvasContainer: function() {
      return this.canvasContainer[0];
    }
  });

  return new CanvasContainer();
});
