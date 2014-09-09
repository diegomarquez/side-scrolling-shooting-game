define(function(require) {
  var Button = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var button = document.createElement('button');
      button.id = options.id;
      button.type  = 'button';
      button.innerHTML = options.label;
      button.onclick = options.onClick;

      return button;
    }
  });

  return Button;
});