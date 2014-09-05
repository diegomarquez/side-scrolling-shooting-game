define(function(require) {

  var WrapInDiv = require("class").extend({
    init: function() {},

    wrap: function(child, options) {
      var container = document.createElement('div')

      if (options) {
        if (options.id) {
          container.id = options.id;
        }

        if (options.className) {
          container.className = options.className;
        }
      }
      
      container.appendChild(child);
      
      return container;
    }
  });

  return new WrapInDiv();
});