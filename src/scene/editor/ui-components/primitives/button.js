define(function(require) {
  var Button = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var button = document.createElement('button');
      if (options.id) {
        button.id = options.id;
      }

      if (options.className) {
        button.className = options.className;
      }

      if (options.label) {
        button.innerHTML = options.label;
      }

      button.type  = 'button';
      button.onclick = options.onClick;

      return button;
    }
  });

  return Button;
});