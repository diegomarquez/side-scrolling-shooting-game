define(function(require) {

  var WrapInDiv = require("class").extend({
    init: function() {},

    wrap: function(children, options) {
      var container = document.createElement('div')

      if (options) {
        if (options.id) {
          container.id = options.id;
        }

        var cssClasses = options.className || options.classNames;

        if (cssClasses) {
          if (Object.prototype.toString.call(cssClasses) === "[object Array]") {
            container.className = cssClasses.join(" ");
          } else {
            container.className = cssClasses;
          }
        }
      }
      
      var c = [].concat(children);

      for (var i = 0; i < c.length; i++) {
        var child = c[i];

        if (child.length) {
          container.appendChild(c[i][0]);
        } else {
          container.appendChild(c[i]);
        }
      }

      return container;
    }
  });

  return new WrapInDiv();
});