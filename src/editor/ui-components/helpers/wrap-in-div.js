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

        if (options.style) {
          if (Object.prototype.toString.call(options.style) === "[object String]") {
            container.style.cssText = options.style;
          } else {
            var styles = [];

            for (var style in options.style) {
              styles.push(style + ': ' + options.style[style]);  
            };

            container.style.cssText = styles.join(';');
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