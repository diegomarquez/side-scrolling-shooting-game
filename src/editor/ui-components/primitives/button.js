define(function(require) {
  var Button = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var button = document.createElement('button');
      button.id = options.id;
      button.innerHTML = options.label;
      button.type  = 'button';

      button.onclick = options.onClick;

      return button;
    }
  });

  return Button;
});