define(function(require) {
  var option = require('option');

  var Dropdown = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var dropdown = document.createElement('select');

      dropdown.id = options.id;
      dropdown.add(option.create(options.defaultMessage, 'Nothing'));

      for(var i = 0; i < options.data.length; i++) {
        dropdown.add(option.create(options.data[i], options.data[i]));
      }

      dropdown.onchange = options.onChange;

      return dropdown;
    }
  });

  return Dropdown;
});