define(function(require) {
  var TextInput = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var input = document.createElement('input');

      input.id = options.id;
      input.type = 'text';
      input.placeholder = options.defaultMessage;

      input.onchange = options.onChange;

      return input;
    }
  });

  return TextInput;
});