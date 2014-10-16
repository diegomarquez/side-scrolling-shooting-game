define(function(require) {
  var ScaleUIValueSetter = require("class").extend({
    init: function() {},

    set: function(viewport) {
      var scaleContainer = $('#viewport-options-' + viewport.name).find('#scale-container');      

      scaleContainer.find('.xValue').val(viewport.ScaleX);
      scaleContainer.find('.yValue').val(viewport.ScaleY);
    }
  });

  return new ScaleUIValueSetter();
});
