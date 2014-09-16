define(function(require) {
  require('jquery');
  require('jquery-ui');

  var wrapper = require('wrap-in-div');

  var ButtonSet = require('class').extend({
    init: function() {

    },

    create: function(options) {      
      var elements = [];

      for (var i = 0; i < options.checkboxes.length; i++) {
        var checkbox = document.createElement('input');

        checkbox.id = options.id + '-' + options.checkboxes[i].label;
        checkbox.type = 'checkbox';
        checkbox.checked = options.checkboxes[i].state;

        checkbox.name = options.checkboxes[i].label;
        checkbox.value = options.checkboxes[i].label;

        checkbox.onchange = options.checkboxes[i].onChange;

        var label = document.createElement('label');
        label.setAttribute('for', checkbox.id);
        label.innerHTML = options.checkboxes[i].label;

        elements.push(checkbox);
        elements.push(label);
      };

      var wrapped = wrapper.wrap(elements, { id: options.id });

      $(wrapped).buttonset();

      return wrapped;
    }
  });

  return ButtonSet;
});