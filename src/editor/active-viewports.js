define(function(require) {

  var result = null;

  var ActiveViewports = require("class").extend({
    init: function() {},

    get: function() {
      var viewports = document.querySelectorAll('#viewportCheckbox');        

      result = [];

      for (var i = 0; i < viewports.length; i++) {
        var viewport = viewports[i];

        var checkbox = viewport.querySelector('input');

        var active = checkbox.checked;
        var name = checkbox.name;
        var layer  = viewport.querySelector('select').value;

        if (active) {
          result.push({
            viewport: name,
            layer: layer
          })
        }
      }

      return result; 
    }
  });

  return new ActiveViewports();
});
