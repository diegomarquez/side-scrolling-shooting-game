define(function(require) {

  var WrapInDiv = require("class").extend({
    init: function() {},

    wrap: function(children, options) {
      var container = document.createElement('div')

      if (options) {
        if (options.id) {
          container.id = options.id;
        }

        if (options.className) {
          container.className = options.className;
        }
      }
      
      var c = [].concat(children);

      for (var i = 0; i < c.length; i++) {
        container.appendChild(c[i]);
      }

      return container;
    }
  });

  return new WrapInDiv();
});