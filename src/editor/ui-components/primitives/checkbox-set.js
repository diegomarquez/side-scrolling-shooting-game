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

        var startLabel = checkboxOptions.label ? checkboxOptions.label : checkboxOptions.offLabel;

        checkbox.id = options.id + '-' + startLabel;
        checkbox.name = startLabel;
        checkbox.value = startLabel;
        checkbox.type = 'checkbox';
        checkbox.checked = checkboxOptions.state;
        checkbox.disabled = checkboxOptions.disable;

        var label = document.createElement('label');
        label.setAttribute('for', checkbox.id);
        label.innerHTML = startLabel;

        checkbox.onchange = function (checkboxOptions) {
          return function (event) {
            if (checkboxOptions.onChange) {
              if (!checkboxOptions.label) {
                if (event.target.checked) {
                  $(event.target).next('label').find("span").text(checkboxOptions.onLabel);
                } else {
                  $(event.target).next('label').find("span").text(checkboxOptions.offLabel);
                }
              }

              checkboxOptions.onChange(event);
            }
          }
        }(checkboxOptions);

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