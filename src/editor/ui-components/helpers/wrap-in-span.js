define(function(require) {

  var WrapInSpan = require("class").extend({
    init: function() {},

    wrap: function(children) {
      var container = document.createElement('span')
      
      var c = [].concat(children);

      for (var i = 0; i < c.length; i++) {
        container.appendChild(c[i]);
      }

      return container;
    }
  });

  return new WrapInSpan();
});