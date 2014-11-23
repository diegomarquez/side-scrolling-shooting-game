define(function(require) {
  var editorConfig = require('editor-config');

  var ActiveViewports = require("class").extend({
    init: function() {},

    get: function() {
      var selectedViewports = $('#viewport-selector-simple').attr('value');

      if (!selectedViewports) return;

      var viewportNames = selectedViewports.split(', ')

      var result = [];

      for (var i = 0; i < viewportNames.length; i++) {
        var viewportName = viewportNames[i];

        result.push({
          viewport: viewportName,
          layer: editorConfig.getViewportTopMostLayer(viewportName)
        })        
      }

      return result; 
    }
  });

  return new ActiveViewports();
});
