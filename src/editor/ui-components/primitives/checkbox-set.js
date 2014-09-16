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
        var checkboxOptions = options.checkboxes[i];

        checkbox.id = options.id + '-' + checkboxOptions.label;
        checkbox.type = 'checkbox';
        checkbox.checked = checkboxOptions.state;
        checkbox.disabled = checkboxOptions.disable;

        checkbox.name = checkboxOptions.label;
        checkbox.value = checkboxOptions.label;

        checkbox.onchange = checkboxOptions.onChange;

        var label = document.createElement('label');
        label.setAttribute('for', checkbox.id);
        label.innerHTML = checkboxOptions.label;

        elements.push(checkbox);
        elements.push(label);
      };

      var wrapped = wrapper.wrap(elements, { id: options.id, className: options.containerClass });

      $(wrapped).buttonset();

      return wrapped;
    }
  });

  return ButtonSet;
});